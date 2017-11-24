var Transform = require('stream').Transform;
var util = require('util');

var TransformStream = function(n?: number) {
	this._buff = [];
	this._n = (n ? n : 1);
	Transform.call(this, {objectMode: true});
};

util.inherits(TransformStream, Transform);

TransformStream.prototype._transform = function(chunk, encoding, callback) {
	this._buff.push(chunk);
	if (this._buff.length === this._n) {
		this.push(this._buff);
		this._buff = [];
	}
	callback();
};

TransformStream.prototype.end = function(chunk, encoding, callback) {
	//console.log("TransformStream.end() called");
	if (chunk) this._buff.push(chunk);
	if (this._buff.length > 0) {
		this.push(this._buff);
		this._buff = [];
	}
	Transform.prototype.end.call(this, null, encoding, callback);
}

import * as stream from "stream";

export function aggregate(n?: number) : stream.Transform {return new TransformStream(n);}