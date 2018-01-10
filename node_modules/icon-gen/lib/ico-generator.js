'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IcoConstants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pngjs = require('pngjs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It defines constants for the ICO.
 * @type {Object}
 */
var IcoConstants = exports.IcoConstants = {
  /**
   * Sizes required for the ICO file.
   * @type {Array}
   */
  imageSizes: [16, 24, 32, 48, 64, 128, 256],

  /**
   * Size of the file header.
   * @type {Number}
   */
  headerSize: 6,

  /**
   * Size of the icon directory.
   * @type {Number}
   */
  directorySize: 16,

  /**
   * Size of the BITMAPINFOHEADER.
   * @type {Number}
   */
  BitmapInfoHeaderSize: 40,

  /**
   * Color mode.
   * @type {Number}
   */
  BI_RGB: 0
};

/**
 * Generate the ICO file from PNG images.
 */

var IcoGenerator = function () {
  function IcoGenerator() {
    _classCallCheck(this, IcoGenerator);
  }

  _createClass(IcoGenerator, null, [{
    key: 'generate',

    /**
     * Generate the ICO file from a PNG images.
     *
     * @param {Array.<ImageInfo>} images File informations..
     * @param {String}            dest   Output destination The path of ICO file.
     * @param {Logger}            logger Logger.
     *
     * @return {Promise} Promise object.
     */
    value: function generate(images, dest, logger) {
      return new Promise(function (resolve) {
        logger.log('ICO:');

        var stream = _fs2.default.createWriteStream(dest);
        stream.write(IcoGenerator.createFileHeader(images.length), 'binary');

        var pngs = images.map(function (image) {
          var data = _fs2.default.readFileSync(image.path);
          return _pngjs.PNG.sync.read(data);
        });

        var offset = IcoConstants.headerSize + IcoConstants.directorySize * images.length;
        pngs.forEach(function (png) {
          var directory = IcoGenerator.createDirectory(png, offset);
          stream.write(directory, 'binary');
          offset += png.data.length + IcoConstants.BitmapInfoHeaderSize;
        });

        pngs.forEach(function (png) {
          var header = IcoGenerator.createBitmapInfoHeader(png, IcoConstants.BI_RGB);
          stream.write(header, 'binary');

          var dib = IcoGenerator.convertPNGtoDIB(png.data, png.width, png.height, png.bpp);
          stream.write(dib, 'binary');
        });

        logger.log('  Create: ' + dest);
        resolve(dest);
      });
    }

    /**
     * Create the ICO file header.
     *
     * @param {Number} count  Specifies number of images in the file.
     *
     * @return {Buffer} Header data.
     */

  }, {
    key: 'createFileHeader',
    value: function createFileHeader(count) {
      var b = new Buffer(IcoConstants.headerSize);
      b.writeUInt16LE(0, 0); // 2 Reserved
      b.writeUInt16LE(1, 2); // 2 Type
      b.writeUInt16LE(count, 4); // 2 Image count

      return b;
    }

    /**
     * Create the Icon entry.
     *
     * @param {Object} png    PNG image.
     * @param {Number} offset The offset of directory data from the beginning of the ICO/CUR file
     *
     * @return {Buffer} Directory data.
     */

  }, {
    key: 'createDirectory',
    value: function createDirectory(png, offset) {
      var b = new Buffer(IcoConstants.directorySize);
      var size = png.data.length + IcoConstants.BitmapInfoHeaderSize;
      var width = 256 <= png.width ? 0 : png.width;
      var height = 256 <= png.height ? 0 : png.height;
      var bpp = png.bpp * 8;

      b.writeUInt8(width, 0); // 1 Image width
      b.writeUInt8(height, 1); // 1 Image height
      b.writeUInt8(0, 2); // 1 Colors
      b.writeUInt8(0, 3); // 1 Reserved
      b.writeUInt16LE(1, 4); // 2 Color planes
      b.writeUInt16LE(bpp, 6); // 2 Bit per pixel
      b.writeUInt32LE(size, 8); // 4 Bitmap ( DIB ) size
      b.writeUInt32LE(offset, 12); // 4 Offset

      return b;
    }

    /**
     * Create the BITMAPINFOHEADER.
     *
     * @param {Object} png         PNG image.
     * @param {Number} compression Compression mode
     *
     * @return {Buffer} BITMAPINFOHEADER data.
     */

  }, {
    key: 'createBitmapInfoHeader',
    value: function createBitmapInfoHeader(png, compression) {
      var b = new Buffer(IcoConstants.BitmapInfoHeaderSize);
      b.writeUInt32LE(IcoConstants.BitmapInfoHeaderSize, 0); // 4 DWORD biSize
      b.writeInt32LE(png.width, 4); // 4 LONG  biWidth
      b.writeInt32LE(png.height * 2, 8); // 4 LONG  biHeight
      b.writeUInt16LE(1, 12); // 2 WORD  biPlanes
      b.writeUInt16LE(png.bpp * 8, 14); // 2 WORD  biBitCount
      b.writeUInt32LE(compression, 16); // 4 DWORD biCompression
      b.writeUInt32LE(png.data.length, 20); // 4 DWORD biSizeImage
      b.writeInt32LE(0, 24); // 4 LONG  biXPelsPerMeter
      b.writeInt32LE(0, 28); // 4 LONG  biYPelsPerMeter
      b.writeUInt32LE(0, 32); // 4 DWORD biClrUsed
      b.writeUInt32LE(0, 36); // 4 DWORD biClrImportant

      return b;
    }

    /**
     * Convert a PNG of the byte array to the DIB ( Device Independent Bitmap ) format.
     *
     * PNG in color RGBA ( and more ), the coordinate structure is the Top/Left to Bottom/Right.
     * DIB in color BGRA, the coordinate structure is the Bottom/Left to Top/Right.
     *
     * @param {Buffer} src    Target image.
     * @param {Number} width  The width of the image.
     * @param {Number} height The height of the image.
     * @param {Number} bpp    The bit per pixel of the image.
     *
     * @return {Buffer} Converted image
     *
     * @see https://en.wikipedia.org/wiki/BMP_file_format
     */

  }, {
    key: 'convertPNGtoDIB',
    value: function convertPNGtoDIB(src, width, height, bpp) {
      var cols = width * bpp;
      var rows = height * cols;
      var rowEnd = rows - cols;
      var dest = new Buffer(src.length);

      for (var row = 0; row < rows; row += cols) {
        for (var col = 0; col < cols; col += bpp) {
          // RGBA: Top/Left -> Bottom/Right
          var pos = row + col;
          var r = src.readUInt8(pos);
          var g = src.readUInt8(pos + 1);
          var b = src.readUInt8(pos + 2);
          var a = src.readUInt8(pos + 3);

          // BGRA: Right/Left -> Top/Right
          pos = rowEnd - row + col;
          dest.writeUInt8(b, pos);
          dest.writeUInt8(g, pos + 1);
          dest.writeUInt8(r, pos + 2);
          dest.writeUInt8(a, pos + 3);
        }
      }

      return dest;
    }
  }]);

  return IcoGenerator;
}();

exports.default = IcoGenerator;