let supportPassive = false;
// create options object with a getter to see if its passive property is accessed
const opts = Object.defineProperty && Object.defineProperty({}, 'passive', {get: function () {
    supportPassive = {passive:true};
}});
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener('test', () => {}, opts);

const mobileTest = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;

module.exports = {
    supportPassive: supportPassive,
    isMobileDevice: mobileTest.test(navigator.userAgent)
};