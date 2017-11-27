"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Transform = require('stream').Transform;
var util = require('util');
var TransformStream = function (n) {
    this._buff = [];
    this._n = (n ? n : 1);
    Transform.call(this, { objectMode: true });
};
util.inherits(TransformStream, Transform);
TransformStream.prototype._transform = function (chunk, encoding, callback) {
    this._buff.push(chunk);
    if (this._buff.length === this._n) {
        this.push(this._buff);
        this._buff = [];
    }
    callback();
};
TransformStream.prototype.end = function (chunk, encoding, callback) {
    //console.log("TransformStream.end() called");
    if (chunk)
        this._buff.push(chunk);
    if (this._buff.length > 0) {
        this.push(this._buff);
        this._buff = [];
    }
    Transform.prototype.end.call(this, null, encoding, callback);
};
var stream = require("stream");
function aggregate(n) { return new TransformStream(n); }
exports.aggregate = aggregate;
var UnAggregateStream = /** @class */ (function (_super) {
    __extends(UnAggregateStream, _super);
    function UnAggregateStream() {
        return _super.call(this, { objectMode: true }) || this;
    }
    UnAggregateStream.prototype._transform = function (chunk, encoding, callback) {
        var ar = chunk;
        for (var i in ar)
            this.push(ar[i]);
        callback();
    };
    return UnAggregateStream;
}(stream.Transform));
function un_aggregate() { return new UnAggregateStream(); }
exports.un_aggregate = un_aggregate;
//# sourceMappingURL=index.js.map