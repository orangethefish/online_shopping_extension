console.log('cart.js loaded');
// const scriptTag = document.createElement('script');
// scriptTag.setAttribute('type','application/javascript');
// scriptTag.innerText = `document.getElementsByClassName('JB57cn')[0].innerHTML;`;
// document.head.appendChild(scriptTag);


// Monitor for changes in document
const checkDOM = setInterval(() => {
    const content = document.querySelector('.JB57cn');
    if(content) {
      // DOM loaded
      clearInterval(checkDOM); 
      // Access DOM
        const elements = document.querySelectorAll('.JB57cn');
        for (let element of elements) {
            console.log(element.innerHTML);
        }
    } 
}, 200);//working 100%