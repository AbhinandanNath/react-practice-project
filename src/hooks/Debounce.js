/* eslint-disable no-unused-vars */
export function debounce(callbackFn, waitTime) {
    let timer = null;
    return function(...arg) {
        clearTimeout(timer);
        setTimeout(()=> {
            callbackFn(...arg);
        },waitTime);
    }
}



function testDebouncing() {

    function printMessage(i) {
        console.log("Value of i :: ",i);
    }

    // const handleDebounce = debounce(printMessage, 1000);
    const handleDebounce = debounce((i) => {
        printMessage(i)
    }, 1000);

    for (let index = 1; index < 5 ;index++) {
        handleDebounce(index)
        
    }
}

function delay(waitTime) {
    return new Promise((resolve) => {
        setTimeout(resolve, waitTime)
    })
}

async function runDelay() {
    console.log("Started");
    await delay(2000);
    console.log("Finished")
}
runDelay();
testDebouncing();

function classNames(...args) {
    let input = args;
    let result = [];
  
    function flatten(obj) {
      for (let el in obj) {
        if (typeof obj[el] === "object") {
          flatten(obj[el]);
        } else if (obj[el]) {
           result.push(Array.isArray(obj) ? obj[el] : el)
         
        }
      }
    }
    for (let element of input) {
      if (typeof element === "object") {
        flatten(element);
      } else if (element) {
        result.push(element);
      }
    }
  
    return result.join(" ");
  }
  