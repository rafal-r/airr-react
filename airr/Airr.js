function Airr() {

}
Airr.supportsPassive = false;

// create options object with a getter to see if its passive property is accessed
var opts = Object.defineProperty && Object.defineProperty({}, 'passive', {get: function () {
    Airr.supportsPassive = {passive:true};
}});
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener('test', () => {}, opts);

export default Airr;