'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _pngGenerator = require('./png-generator.js');

var _pngGenerator2 = _interopRequireDefault(_pngGenerator);

var _icoGenerator = require('./ico-generator.js');

var _icoGenerator2 = _interopRequireDefault(_icoGenerator);

var _icnsGenerator = require('./icns-generator.js');

var _icnsGenerator2 = _interopRequireDefault(_icnsGenerator);

var _faviconGenerator = require('./favicon-generator.js');

var _faviconGenerator2 = _interopRequireDefault(_faviconGenerator);

var _cliUtil = require('../bin/cli-util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Generate an icons.
 */
var IconGenerator = function () {
  function IconGenerator() {
    _classCallCheck(this, IconGenerator);
  }

  _createClass(IconGenerator, null, [{
    key: 'fromSVG',

    /**
     * Generate an icon from the SVG file.
     *
     * @param {String} src     Path of the SVG file.
     * @param {String} dir     Path of the output files directory.
     * @param {Object} options Options.
     * @param {Logger} logger  Logger.
     *
     * @return {Promise} Promise object.
     */
    value: function fromSVG(src, dir, options, logger) {
      return new Promise(function (resolve, reject) {
        var svgFilePath = _path2.default.resolve(src);
        var destDirPath = _path2.default.resolve(dir);
        logger.log('Icon generetor from SVG:');
        logger.log('  src: ' + svgFilePath);
        logger.log('  dir: ' + destDirPath);

        var workDir = _pngGenerator2.default.createWorkDir();
        if (!workDir) {
          reject(new Error('Failed to create the working directory.'));
          return;
        }

        _pngGenerator2.default.generate(svgFilePath, workDir, options.modes, function (err, images) {
          if (err) {
            _del2.default.sync([workDir], { force: true });
            reject(err);
            return;
          }

          IconGenerator.generate(images, destDirPath, options, logger, function (err2, results) {
            _del2.default.sync([workDir], { force: true });
            return err2 ? reject(err2) : resolve(results);
          });
        }, logger);
      });
    }

    /**
     * Generate an icon from the SVG file.
     *
     * @param {String} src     Path of the PNG files direcgtory.
     * @param {String} dir     Path of the output files directory.
     * @param {Object} options Options.
     * @param {Logger} logger  Logger.
     *
     * @return {Promise} Promise object.
     */

  }, {
    key: 'fromPNG',
    value: function fromPNG(src, dir, options, logger) {
      return new Promise(function (resolve, reject) {
        var pngDirPath = _path2.default.resolve(src);
        var destDirPath = _path2.default.resolve(dir);
        logger.log('Icon generetor from PNG:');
        logger.log('  src: ' + pngDirPath);
        logger.log('  dir: ' + destDirPath);

        var images = _pngGenerator2.default.getRequiredImageSizes(options.modes).map(function (size) {
          return _path2.default.join(pngDirPath, size + '.png');
        }).map(function (path) {
          var size = Number(_path2.default.basename(path, '.png'));
          return { path: path, size: size };
        });

        var notExistsFile = null;
        images.some(function (image) {
          var stat = _fs2.default.statSync(image.path);
          if (!(stat && stat.isFile())) {
            notExistsFile = _path2.default.basename(image.path);
            return true;
          }

          return false;
        });

        if (notExistsFile) {
          reject(new Error('"' + notExistsFile + '" does not exist.'));
          return;
        }

        IconGenerator.generate(images, dir, options, logger, function (err, results) {
          return err ? reject(err) : resolve(results);
        });
      });
    }

    /**
     * Generate an icon from the image file infromations.
     *
     * @param {Array.<ImageInfo>} images  Image file informations.
     * @param {String}            dest    Destination directory path.
     * @param {Object}            options Options.
     * @param {Logger}            logger  Logger.
     * @param {Function}          cb      Callback function.
     */

  }, {
    key: 'generate',
    value: function generate(images, dest, options, logger, cb) {
      if (!(images && 0 < images.length)) {
        cb(new Error('Targets is empty.'));
        return;
      }

      var dir = _path2.default.resolve(dest);
      _mkdirp2.default.sync(dir);

      // Select output mode
      var tasks = [];
      var path = null;
      options.modes.forEach(function (mode) {
        switch (mode) {
          case _cliUtil.CLIConstatns.modes.ico:
            path = _path2.default.join(dir, options.names.ico + '.ico');
            tasks.push(_icoGenerator2.default.generate(IconGenerator.filter(images, _icoGenerator.IcoConstants.imageSizes), path, logger));
            break;

          case _cliUtil.CLIConstatns.modes.icns:
            path = _path2.default.join(dir, options.names.icns + '.icns');
            tasks.push(_icnsGenerator2.default.generate(IconGenerator.filter(images, _icnsGenerator.IcnsConstants.imageSizes), path, logger));
            break;

          case _cliUtil.CLIConstatns.modes.favicon:
            path = _path2.default.join(dir, 'favicon.ico');
            tasks.push(_icoGenerator2.default.generate(IconGenerator.filter(images, _faviconGenerator.FaviconConstants.icoImageSizes), path, logger));
            tasks.push(_faviconGenerator2.default.generate(IconGenerator.filter(images, _faviconGenerator.FaviconConstants.imageSizes), dir, logger));
            break;

          default:
            break;
        }
      });

      Promise.all(tasks).then(function (results) {
        cb(null, IconGenerator.flattenValues(results));
      }).catch(function (err) {
        cb(err);
      });
    }

    /**
     * Filter by size to the specified image informations.
     *
     * @param {Array.<ImageInfo>} images Image file informations.
     * @param {Array.<Number>}    sizes  Required sizes.
     *
     * @return {Array.<ImageInfo>} Filtered image informations.
     */

  }, {
    key: 'filter',
    value: function filter(images, sizes) {
      return images.filter(function (image) {
        return sizes.some(function (size) {
          return image.size === size;
        });
      }).sort(function (a, b) {
        return a.size - b.size;
      });
    }

    /**
     * Convert a values to a flat array.
     *
     * @param  {Array.<String|Array>} values Values ( [ 'A', 'B', [ 'C', 'D' ] ] ).
     *
     * @return {Array.<String>} Flat array ( [ 'A', 'B', 'C', 'D' ] ).
     */

  }, {
    key: 'flattenValues',
    value: function flattenValues(values) {
      var paths = [];
      values.forEach(function (value) {
        if (!value) {
          return;
        }

        if (Array.isArray(value)) {
          value.forEach(function (path) {
            paths.push(path);
          });
        } else {
          paths.push(value);
        }
      });

      return paths;
    }
  }]);

  return IconGenerator;
}();

exports.default = IconGenerator;