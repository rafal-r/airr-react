"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var supportPassive = false;

var opts = Object.defineProperty && Object.defineProperty({}, "passive", {
    get: function get() {
        exports.supportPassive = supportPassive = { passive: true };
        return supportPassive;
    }
});

document.addEventListener("test", function () {}, opts);

var mobileTest = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
var isMobileDevice = mobileTest.test(navigator.userAgent);

exports.supportPassive = supportPassive;
exports.isMobileDevice = isMobileDevice;