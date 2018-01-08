'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IcnsConstants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * It defines constants for the ICNS.
 * @type {Object}
 */
var IcnsConstants = exports.IcnsConstants = {
  /**
   * Sizes required for the ICNS file.
   * @type {Array}
   */
  imageSizes: [16, 32, 64, 128, 256, 512, 1024],

  /**
   * The size of the ICNS header.
   * @type {Number}
   */
  headerSize: 8,

  /**
   * Identifier of the ICNS file, in ASCII "icns".
   * @type {Number}
   */
  fileID: 'icns',

  /**
   * Identifier of the images, Mac OS 8.x ( il32, is32, l8mk, s8mk ) is unsupported.
   * @type {Array}
   */
  iconIDs: [{ id: 'icp4', size: 16 }, { id: 'icp5', size: 32 }, { id: 'icp6', size: 64 }, { id: 'ic07', size: 128 }, { id: 'ic08', size: 256 }, { id: 'ic09', size: 512 }, { id: 'ic10', size: 1024 }]
};

/**
 * Generate the ICNS file from a PNG images.
 * However, Mac OS 8.x is unsupported.
 */

var IcnsGenerator = function () {
  function IcnsGenerator() {
    _classCallCheck(this, IcnsGenerator);
  }

  _createClass(IcnsGenerator, null, [{
    key: 'generate',

    /**
     * Create the ICNS file from a PNG images.
     *
     * @param {Array.<ImageInfo>} images File informations..
     * @param {String}            dest   Output destination The path of ICNS file.
     * @param {Logger}            logger Logger.
     *
     * @return {Promise} Promise object.
     */
    value: function generate(images, dest, logger) {
      return new Promise(function (resolve, reject) {
        logger.log('ICNS:');

        var stream = _fs2.default.createWriteStream(dest);

        var size = IcnsGenerator.fileSizeFromImages(images);
        stream.write(IcnsGenerator.createFileHeader(size), 'binary');

        for (var i = 0, max = IcnsConstants.iconIDs.length; i < max; ++i) {
          var iconID = IcnsConstants.iconIDs[i];
          if (!IcnsGenerator.writeImage(iconID, images, stream)) {
            reject(new Error('Faild to read/write image.'));
            return;
          }
        }

        logger.log('  Create: ' + dest);
        resolve(dest);
      });
    }

    /**
     * Write the image.
     *
     * @param {Object}            iconID Identifier of the icon.
     * @param {Array.<ImageInfo>} images File informations..
     * @param {WritableStream}    stream Target stream.
     *
     * @return {Boolean} If success "true".
     */

  }, {
    key: 'writeImage',
    value: function writeImage(iconID, images, stream) {
      // Unknown target is ignored
      var image = IcnsGenerator.imageFromIconID(iconID, images);
      if (!image) {
        return true;
      }

      var data = _fs2.default.readFileSync(image.path);
      if (!data) {
        return false;
      }

      var header = IcnsGenerator.createIconHeader(iconID, data.length);
      stream.write(header, 'binary');
      stream.write(data, 'binary');
      return true;
    }

    /**
     * Select the image support to the icon.
     *
     * @param {Object}            iconID Identifier of the icon.
     * @param {Array.<ImageInfo>} images File informations..
     *
     * @return {ImageInfo} If successful image information, otherwise null.
     */

  }, {
    key: 'imageFromIconID',
    value: function imageFromIconID(iconID, images) {
      var result = null;
      images.some(function (image) {
        if (image.size === iconID.size) {
          result = image;
          return true;
        }

        return false;
      });

      return result;
    }

    /**
     * Create the ICNS file header.
     *
     * @param {Number} fileSize File size.
     *
     * @return {Buffer} Header data.
     */

  }, {
    key: 'createFileHeader',
    value: function createFileHeader(fileSize) {
      var b = new Buffer(IcnsConstants.headerSize);
      b.write(IcnsConstants.fileID, 0, 'ascii');
      b.writeUInt32BE(fileSize, 4);

      return b;
    }

    /**
     * Create the Icon header in ICNS file.
     *
     * @param {Object} iconID    Icon identifier.
     * @param {Number} imageSize Size of the image.
     *
     * @return {Buffer} Header data.
     */

  }, {
    key: 'createIconHeader',
    value: function createIconHeader(iconID, imageSize) {
      var b = new Buffer(IcnsConstants.headerSize);
      b.write(iconID.id, 0, 'ascii');
      b.writeUInt32BE(IcnsConstants.headerSize + imageSize, 4);

      return b;
    }

    /**
     * Calculate the size of the ICNS file.
     *
     * @param {Array.<ImageInfo>} images File informations.
     *
     * @return {Number} File size.
     */

  }, {
    key: 'fileSizeFromImages',
    value: function fileSizeFromImages(images) {
      var size = 0;
      images.forEach(function (image) {
        var stat = _fs2.default.statSync(image.path);
        size += stat.size;
      });

      return size + IcnsConstants.headerSize + IcnsConstants.headerSize * images.length;
    }
  }]);

  return IcnsGenerator;
}();

exports.default = IcnsGenerator;