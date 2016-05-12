'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var request = _interopRequireWildcard(_superagent);

var _response = require('./response');

var _error = require('./error');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = exports.Client = function () {
  function Client(token) {
    _classCallCheck(this, Client);

    this.token = token;
  }

  /**
   * Perform a text request on Recast.AI
   * @param {String} text: the text to process
   * @param {Function} callback: the callback which be called with the Response of the request
   * @param {Hash} options: [optional] request's options
   * @throws {RecastError}: On bad request or on missing token
   */


  _createClass(Client, [{
    key: 'textRequest',
    value: function textRequest(text, callback, options) {
      var TOKEN = options && options.token ? options.token : this.token;

      if (!TOKEN) {
        throw new _error.RecastError('Token is missing');
      } else {
        request.post('https://api.recast.ai/v1/request').set('Authorization', 'Token ' + TOKEN).send({ text: text }).end(function (err, res) {
          if (err) {
            throw new _error.RecastError(res.message);
          } else {
            return callback(new _response.Response(res.body));
          }
        });
      }
    }

    /**
     * Perform a voice file request on Recast.AI
     * @param {String} file: the name of the file to process
     * @param {Function} callback: the callback which be called with the Response of the request
     * @param {Hash} options: [optional] request's options
     * @throws {RecastError}: On bad request or on missing token
     */

  }, {
    key: 'fileRequest',
    value: function fileRequest(file, callback, options) {
      var TOKEN = options && options.token ? options.token : this.token;

      if (!TOKEN) {
        throw new _error.RecastError('Token is missing');
      } else {
        request.post('https://api.recast.ai/v1/request').attach('voice', file).set('Authorization', 'Token ' + TOKEN).set('Content-Type', '').end(function (err, res) {
          if (err) {
            throw new _error.RecastError(res.message);
          } else {
            return callback(new _response.Response(res.body));
          }
        });
      }
    }
  }]);

  return Client;
}();