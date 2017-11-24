import s2s = require("string-to-stream");
import JSONStream = require('JSONStream');
import {Transform} from "stream";
import * as oas from "./";

let o =
[
	{ "name":"Ford", "models":[ "Fiesta", "Focus", "Mustang" ] },
	{ "name":"BMW", "models":[ "320", "X3", "X5" ] },
	{ "name":"Fiat", "models":[ "500", "Panda" ] }
];

let js: Transform = JSONStream.parse('*');

js.on("data", (chunk) => {
	//console.log(JSON.stringify(chunk));
}).on("finish", () => {
	console.log("JS: <<FINISH>>");
}).on("end", () => {
	console.log("JS: <<END>>");
});

let ts = oas.aggregate(2);

ts.on("data", (chunk) => {
	console.log("TS: <DATA>: " + JSON.stringify(chunk));
}).on("finish", () => {
	console.log("TS: <<FINISH>>");
}).on("end", () => {
	console.log("TS: <<END>>");
});

s2s(JSON.stringify(o)).pipe(js).pipe(ts);