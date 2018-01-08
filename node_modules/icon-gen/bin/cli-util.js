'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLIConstatns = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Commad line options.
 *
 * @typedef {Object} CLIOptions
 * @property {Boolean} help    Mode to display the help text.
 * @property {Boolean} version Mode to display the version number.
 * @property {String}  input   Path of the SVG file or PNG file directory.
 * @property {String}  output  Path of the output directory.
 * @property {String}  type    Type of input file. 'svg' is the SVG file, 'png' is the PNG directory. Default is 'svg'.
 * @property {Boolean} report  Display the process reports. Default is disable.
 */

/**
 * Constatns of CLI process.
 * @type {Object}
 */
var CLIConstatns = exports.CLIConstatns = {
  /**
   * CLI options.
   * @type {Object}
   */
  options: {
    help: ['-h', '--help'],
    version: ['-v', '--version'],
    input: ['-i', '--input'],
    output: ['-o', '--output'],
    type: ['-t', '--type'],
    modes: ['-m', '--modes'],
    names: ['-n', '--names'],
    report: ['-r', '--report']
  },

  /**
   * Execution types.
   * @type {Object}
   */
  types: {
    svg: 'svg',
    png: 'png'
  },

  /**
   * Output modes.
   * @type {Object}
   */
  modes: {
    ico: 'ico',
    icns: 'icns',
    favicon: 'favicon'
  },

  /**
   * Output mode for an all files.
   * @type {Array}
   */
  modeAll: ['ico', 'icns', 'favicon'],

  /**
   * File names.
   * @type {Object}
   */
  names: {
    ico: 'ico',
    icns: 'icns'
  }
};

/**
 * Utility for a command line process.
 */

var CLIUtil = function () {
  function CLIUtil() {
    _classCallCheck(this, CLIUtil);
  }

  _createClass(CLIUtil, null, [{
    key: 'showHelp',

    /**
     * Show the help text.
     *
     * @param {WritableStream} stream Target stream.
     *
     * @return {Promise} Promise object.
     */
    value: function showHelp(stream) {
      return new Promise(function (resolve) {
        stream.write('\nUsage: icon-gen [OPTIONS]\n\nGenerate an icon from the SVG or PNG file.\n\nOptions:\n  -h, --help    Display this text.\n\n  -v, --version Display the version number.\n\n  -i, --input   Path of the SVG file or PNG file directory.\n\n  -o, --output  Path of the output directory.\n\n  -t, --type    Type of the input file.\n                \'svg\' is the SVG file, \'png\' is the PNG files directory.\n                Allowed values: svg, png\n                Default is \'svg\'.\n\n  -m, --modes   Mode of the output files.\n                Allowed values: ico, icns, favicon, all\n                Default is \'all\'.\n\n  -n, --names   Change an output file names for ICO and ICNS.\n                ex: \'ico=foo,icns=bar\'\n                Default is \'app.ico\' and \'app.ico\'.\n\n  -r, --report  Display the process reports.\n                Default is disable.\n\nExamples:\n  $ icon-gen -i sample.svg -o ./dist -r\n  $ icon-gen -i ./images -o ./dist -t png -r\n  $ icon-gen -i sample.svg -o ./dist -m ico,favicon -r\n  $ icon-gen -i sample.svg -o ./dist -n ico=foo,icns=bar\n\nSee also:\n  https://github.com/akabekobeko/npm-icon-gen\n  ');

        resolve();
      });
    }

    /**
     * Show the version number.
     *
     * @param {WritableStream} stream Target stream.
     *
     * @return {Promise} Promise object.
     */

  }, {
    key: 'showVersion',
    value: function showVersion(stream) {
      return new Promise(function (resolve) {
        var read = function read(path) {
          try {
            return require(path).version;
          } catch (err) {
            return null;
          }
        };

        var version = read('../package.json') || read('../../package.json');
        stream.write('v' + version + '\n');

        resolve();
      });
    }

    /**
     * Parse for the command line argumens.
     *
     * @param {Array.<String>} argv Arguments of the command line.
     *
     * @return {CLIOptions} Parse results.
     */

  }, {
    key: 'parse',
    value: function parse(argv) {
      if (!(argv && 0 < argv.length)) {
        return { help: true };
      }

      switch (argv[0]) {
        case CLIConstatns.options.help[0]:
        case CLIConstatns.options.help[1]:
          return { help: true };

        case CLIConstatns.options.version[0]:
        case CLIConstatns.options.version[1]:
          return { version: true };

        default:
          return CLIUtil._parse(argv);
      }
    }

    /**
     * Parse for the command line argumens.
     *
     * @param {Array.<String>} args   Arguments of the command line.
     *
     * @return {CLIOptions} Parse results.
     */

  }, {
    key: '_parse',
    value: function _parse(argv) {
      var options = {};
      argv.forEach(function (arg, index) {
        switch (arg) {
          case CLIConstatns.options.input[0]:
          case CLIConstatns.options.input[1]:
            if (index + 1 < argv.length) {
              options.input = _path2.default.resolve(argv[index + 1]);
            }
            break;

          case CLIConstatns.options.output[0]:
          case CLIConstatns.options.output[1]:
            if (index + 1 < argv.length) {
              options.output = _path2.default.resolve(argv[index + 1]);
            }
            break;

          case CLIConstatns.options.type[0]:
          case CLIConstatns.options.type[1]:
            if (index + 1 < argv.length) {
              options.type = argv[index + 1];
            }
            break;

          case CLIConstatns.options.report[0]:
          case CLIConstatns.options.report[1]:
            options.report = true;
            break;

          case CLIConstatns.options.modes[0]:
          case CLIConstatns.options.modes[1]:
            if (index + 1 < argv.length) {
              options.modes = CLIUtil._parseMode(argv[index + 1]);
            }
            break;

          case CLIConstatns.options.names[0]:
          case CLIConstatns.options.names[1]:
            if (index + 1 < argv.length) {
              options.names = CLIUtil._parseNames(argv[index + 1]);
            }
            break;

          default:
            break;
        }
      });

      if (!options.type || options.type !== CLIConstatns.types.svg && options.type !== CLIConstatns.types.png) {
        options.type = CLIConstatns.types.svg;
      }

      if (!options.modes) {
        options.modes = CLIConstatns.modeAll;
      }

      return options;
    }

    /**
     * Parse for the mode option.
     *
     * @param {String} arg Option. Format is a 'all' or 'ico,icns,favicon'.
     *
     * @return {Array.<String>} Parse results.
     */

  }, {
    key: '_parseMode',
    value: function _parseMode(arg) {
      if (!arg) {
        return CLIConstatns.modeAll;
      }

      var values = arg.split(',').filter(function (value) {
        switch (value) {
          case CLIConstatns.modes.ico:
          case CLIConstatns.modes.icns:
          case CLIConstatns.modes.favicon:
            return true;

          default:
            return false;
        }
      });

      return 0 < values.length ? values : CLIConstatns.modeAll;
    }

    /**
     * Parse the output file names.
     *
     * @param {String} arg Option. Format is a 'ico=foo,icns=bar'.
     *
     * @return {Object} File names.
     */

  }, {
    key: '_parseNames',
    value: function _parseNames(arg) {
      var names = {};
      if (!(typeof arg === 'string')) {
        return names;
      }

      var params = arg.split(',');
      params.forEach(function (param) {
        var units = param.split('=');
        if (units.length < 2) {
          return;
        }

        var key = units[0];
        var value = units[1];
        switch (key) {
          case CLIConstatns.names.ico:
          case CLIConstatns.names.icns:
            names[key] = value;
            break;

          default:
            break;
        }
      });

      return names;
    }
  }]);

  return CLIUtil;
}();

exports.default = CLIUtil;