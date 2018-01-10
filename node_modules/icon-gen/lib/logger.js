"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Display the log message for the stdout.
 */
var Logger = function () {
  /**
   * Initialize instance.
   *
   * @param {Boolean} available "true" to display the report, default is "false".
   */
  function Logger(available) {
    _classCallCheck(this, Logger);

    this._available = available;
  }

  /**
   * Display a log message for the stdout.
   *
   * @param {Array.<Object>} args Message arguments.
   */


  _createClass(Logger, [{
    key: "log",
    value: function log() {
      if (this._available) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }

    /**
     * Display an error message for the stdout.
     *
     * @param {Array.<Object>} args Message arguments.
     */

  }, {
    key: "error",
    value: function error() {
      if (this._available) {
        var _console2;

        (_console2 = console).error.apply(_console2, arguments);
      }
    }
  }]);

  return Logger;
}();

exports.default = Logger;