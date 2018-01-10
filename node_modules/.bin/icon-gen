#!/usr/bin/env node
'use strict';

var _cliUtil = require('./cli-util.js');

var _cliUtil2 = _interopRequireDefault(_cliUtil);

var _main = require('../lib/main.js');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main process.
 *
 * @param {Array.<String>} args   Arguments of the command line.
 *
 * @return {Promise} Promise object.
 */
function execute(options) {
  return new Promise(function (resolve, reject) {
    if (!options.input) {
      return reject(new Error('"-i" or "--input" has not been specified. This parameter is required.'));
    }

    if (!options.output) {
      return reject(new Error('"-o" or "--output" has not been specified. This parameter is required.'));
    }

    return (0, _main2.default)(options.input, options.output, options);
  });
}

/**
 * Entry point of the CLI.
 *
 * @param {Array.<String>} argv   Arguments of the command line.
 * @param {WritableStream} stdout Standard output.
 *
 * @return {Promise} Promise object.
 */
function main(argv, stdout) {
  var options = _cliUtil2.default.parse(argv);
  if (options.help) {
    return _cliUtil2.default.showHelp(stdout);
  } else if (options.version) {
    return _cliUtil2.default.showVersion(stdout);
  }

  return execute(options);
}

main(process.argv.slice(2), process.stdout).then().catch(function (err) {
  console.error(err);
});