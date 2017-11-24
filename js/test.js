"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var s2s = require("string-to-stream");
var JSONStream = require("JSONStream");
var oas = require("./");
var o = [
    { "name": "Ford", "models": ["Fiesta", "Focus", "Mustang"] },
    { "name": "BMW", "models": ["320", "X3", "X5"] },
    { "name": "Fiat", "models": ["500", "Panda"] }
];
var js = JSONStream.parse('*');
js.on("data", function (chunk) {
    //console.log(JSON.stringify(chunk));
}).on("finish", function () {
    console.log("JS: <<FINISH>>");
}).on("end", function () {
    console.log("JS: <<END>>");
});
var ts = oas.aggregate(2);
ts.on("data", function (chunk) {
    console.log("TS: <DATA>: " + JSON.stringify(chunk));
}).on("finish", function () {
    console.log("TS: <<FINISH>>");
}).on("end", function () {
    console.log("TS: <<END>>");
});
s2s(JSON.stringify(o)).pipe(js).pipe(ts);
//# sourceMappingURL=test.js.map