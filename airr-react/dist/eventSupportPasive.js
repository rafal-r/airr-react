'use strict';

var value = false;
// create options object with a getter to see if its passive property is accessed
var opts = Object.defineProperty && Object.defineProperty({}, 'passive', { get: function get() {
        value = { passive: true };
    } });
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener('test', function () {}, opts);

module.exports = value;