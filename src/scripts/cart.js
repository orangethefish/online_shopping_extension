// Monitor for changes in document
const checkDOM = setInterval(() => {
    const content = document.querySelector('.zoXdNN');
    if(content) {
      // DOM loaded
      clearInterval(checkDOM); 
      // Access DOM
        const elements = document.querySelectorAll('.zoXdNN');
        const cartItems = [];
        const username = document.querySelector('.navbar__username').innerText;
        for (let element of elements) {
            const prices = element.querySelectorAll('.M-AAFK');
            const cartItem = {
                username: username,
                name: element.querySelector('.JB57cn').innerText,
                link: element.querySelector('.JB57cn').getAttribute('href'),   
                image: element.querySelector('.WanNdG').getAttribute('src'),
                price: prices[prices.length-1].innerText,
            }
            cartItems.push(cartItem);
        }
        updateCart(cartItems);
        chrome.storage.local.clear();
        chrome.storage.local.set({ 'username' : username,'cart':cartItems.length,'cartItem':cartItems}).then(() => {
            console.log("Value is set");
        });
        console.log(cartItems.length);
        chrome.storage.local.get(['username','cart','cartItem'], result => {
            console.log(result);
        }); 
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