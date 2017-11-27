let value = false;
// create options object with a getter to see if its passive property is accessed
const opts = Object.defineProperty && Object.defineProperty({}, 'passive', {get: function () {
    value = {passive:true};
}});
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener('test', () => {}, opts);

module.exports = value;