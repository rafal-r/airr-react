'use strict';

var supportPassive = false;
// create options object with a getter to see if its passive property is accessed
var opts = Object.defineProperty && Object.defineProperty({}, 'passive', { get: function get() {
        supportPassive = { passive: true };
    } });
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener('test', function () {}, opts);

var mobileTest = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;

module.exports = {
    supportPassive: supportPassive,
    isMobileDevice: mobileTest.test(navigator.userAgent)
};