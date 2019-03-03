let supportPassive = false;
// create options object with a getter to see if its passive property is accessed
const opts =
    Object.defineProperty &&
    Object.defineProperty({}, "passive", {
        get: function() {
            supportPassive = true;
            return supportPassive;
        }
    });
// create a throwaway element & event and (synchronously) test out our options
document.addEventListener("test", () => {}, opts);

const mobileTest = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/;
const isMobileDevice = mobileTest.test(navigator.userAgent);

export { supportPassive, isMobileDevice };
