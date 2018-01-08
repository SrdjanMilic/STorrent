'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaviconConstants = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _icoGenerator = require('./ico-generator.js');

var _icoGenerator2 = _interopRequireDefault(_icoGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * size required for the FAVICON.
 * @type {Object}
 */
var FaviconConstants = exports.FaviconConstants = {
  /**
   * Sizes required for the FAVICON PNG files.
   * @type {Array.<Number>}
   */
  imageSizes: [32, 57, 72, 96, 120, 128, 144, 152, 195, 228],

  /**
   * Sizes required for the FAVICON ICO file.
   * @type {Array.<Number>}
   */
  icoImageSizes: [16, 24, 32, 48, 64],

  /**
   * File name of the FAVICON file.
   * @type {String}
   */
  icoFileName: 'favicon.ico',

  /**
   * Collection of the file name and size of the icon.
   * @type {Array.<Object>}
   * @see https://github.com/audreyr/favicon-cheat-sheet
   */
  pngFiles: [{ name: 'favicon-32.png', size: 32 }, // Certain old but not too old Chrome versions mishandle ico
  { name: 'favicon-57.png', size: 57 }, // Standard iOS home screen ( iPod Touch, iPhone first generation to 3G )
  { name: 'favicon-72.png', size: 72 }, // iPad home screen icon
  { name: 'favicon-96.png', size: 96 }, // GoogleTV icon
  { name: 'favicon-120.png', size: 120 }, // iPhone retina touch icon ( Change for iOS 7: up from 114x114 )
  { name: 'favicon-128.png', size: 128 }, // Chrome Web Store icon
  { name: 'favicon-144.png', size: 144 }, // IE10 Metro tile for pinned site
  { name: 'favicon-152.png', size: 152 }, // iPad retina touch icon ( Change for iOS 7: up from 144x144 )
  { name: 'favicon-195.png', size: 195 }, // Opera Speed Dial icon
  { name: 'favicon-228.png', size: 228 } // Opera Coast icon
  ]
};

/**
 * Generate a FAVICON files from a PNG images.
 */

var FaviconGenerator = function () {
  function FaviconGenerator() {
    _classCallCheck(this, FaviconGenerator);
  }

  _createClass(FaviconGenerator, null, [{
    key: 'generate',

    /**
     * Create a FAVICON image files from a PNG images.
     *
     * @param {Array.<ImageInfo>} images File information for the PNG files generation.
     * @param {String}            dir    Output destination The path of directory.
     * @param {Logger}            logger Logger.
     *
     * @return {Promise} Promise object.
     */
    value: function generate(images, dir, logger) {
      return new Promise(function (resolve, reject) {
        logger.log('Favicon:');

        // PNG
        var tasks = images.map(function (image) {
          return FaviconGenerator.copyImage(image, dir, logger);
        });

        Promise.all(tasks).then(function (results) {
          resolve(results);
        }).catch(function (err) {
          reject(err);
        });
      });
    }

    /**
     * Copy to image.
     *
     * @param {ImageInfo} image  Image information.
     * @param {String}    dir    Output destination The path of directory.
     * @param {Logger}    logger Logger.
     *
     * @return {Promise} Task to copy an image.
     */

  }, {
    key: 'copyImage',
    value: function copyImage(image, dir, logger) {
      return new Promise(function (resolve, reject) {
        var fileName = FaviconGenerator.fileNameFromSize(image.size);
        if (!fileName) {
          // Unknown target is ignored
          resolve('');
          return;
        }

        var reader = _fs2.default.createReadStream(image.path).on('error', function (err) {
          reject(err);
        });

        var dest = _path2.default.join(dir, fileName);
        var writer = _fs2.default.createWriteStream(dest).on('error', function (err) {
          reject(err);
        }).on('close', function () {
          logger.log('  Create: ' + dest);
          resolve(dest);
        });

        reader.pipe(writer);
      });
    }

    /**
     * Generete the ICO file.
     *
     * @param {Array.<ImageInfo>} images File information for ICO file generation.
     * @param {String}            dir    Output destination The path of directory.
     * @param {Logger}            logger Logger.
     *
     * @return {Promise} Task to genereta the ICO file.
     */

  }, {
    key: 'generateICO',
    value: function generateICO(images, dir, logger) {
      return new Promise(function (resolve, reject) {
        var dest = _path2.default.join(dir, FaviconConstants.icoFileName);
        _icoGenerator2.default.generate(images, dest, function (err) {
          if (err) {
            return reject(err);
          }

          logger.log('  Create: ' + dest);
          return resolve(dest);
        }, new _logger2.default());
      });
    }

    /**
     * Get the file names corresponding to image size.
     *
     * @param {Number} size Size of an image.
     *
     * @return {String} If successful name, otherwise null.
     */

  }, {
    key: 'fileNameFromSize',
    value: function fileNameFromSize(size) {
      var name = null;
      FaviconConstants.pngFiles.some(function (pngFile) {
        if (pngFile.size === size) {
          name = pngFile.name;
          return true;
        }

        return false;
      });

      return name;
    }
  }]);

  return FaviconGenerator;
}();

exports.default = FaviconGenerator;