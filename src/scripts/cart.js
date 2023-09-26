console.log('cart.js loaded');
// const scriptTag = document.createElement('script');
// scriptTag.setAttribute('type','application/javascript');
// scriptTag.innerText = `document.getElementsByClassName('JB57cn')[0].innerHTML;`;
// document.head.appendChild(scriptTag);

// //fetch from localhost:3000/index/info and console log all keys
// fetch('http://localhost:5000/index/info')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => console.log(err));

// Monitor for changes in document
const checkDOM = setInterval(() => {
    const content = document.querySelector('.zoXdNN');
    if(content) {
      // DOM loaded
      clearInterval(checkDOM); 
      // Access DOM
        const elements = document.querySelectorAll('.zoXdNN');
        const cartItems = [];
        for (let element of elements) {
            const prices = element.querySelectorAll('.M-AAFK');
            const cartItem = {
                username: document.querySelector('.navbar__username').innerText,
                name: element.querySelector('.JB57cn').innerText,
                image: element.querySelector('.WanNdG').getAttribute('src'),
                price: prices[prices.length-1].innerText,
            }
            cartItems.push(cartItem);
            updateCart(cartItems);
        }
    } 
}, 200);
async function updateCart(cartItems){
    url = 'http://localhost:5000/user/update-cart';
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(cartItems),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => response.json())

}