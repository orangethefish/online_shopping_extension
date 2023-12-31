const host_url ='http://localhost:5000';
// Monitor for changes in document
async function updateCart(cartItems){
    url = `${host_url}/user/update-cart`;
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(cartItems),
        headers: {
            'Content-Type': 'application/json'
        }}).then(response => response.json())

}
const scrollPercentage = (percentage) => {
    // let scrollHeight = document.documentElement.scrollHeight;
    let scrollHeight = document.documentElement.clientHeight;
    return (scrollHeight * percentage) / 100;

};
const checkDOM = setInterval(() => {
    const content = document.querySelector('.zoXdNN');
    if (content) {
        clearInterval(checkDOM);
        
        // Retrieve 'cart' value from storage
        chrome.storage.local.get(['cart'], async result => {
            let cartSize = result['cart'] || 0; // Use default value 0 if 'cart' is not present
            const cartItems = [];
            
            // Rest of your logic
            let elements = document.querySelectorAll('.zoXdNN');
            const maxScroll = 10;
            let scrollCount = 0;
            while (elements.length < cartSize) {
                // Access DOM
                window.scrollBy(0, 1000);
                scrollCount += 1;
                await new Promise(resolve => setTimeout(resolve, 500)); // Introduce a delay for stability
                elements = document.querySelectorAll('.zoXdNN');
                if (scrollCount > maxScroll) {
                    break;
                }
            }
            const inactiveElementsCount = document.querySelectorAll('.VHqcFs','.zoXdNN').length;
            cartSize -= inactiveElementsCount;
            const username = document.querySelector('.navbar__username').innerText;
            for (let element of elements) {
                const prices = element.querySelectorAll('.M-AAFK');
                const cartItem = {
                    username: username,
                    name: element.querySelector('.JB57cn').innerText,
                    link: element.querySelector('.JB57cn').getAttribute('href'),
                    image: element.querySelector('.WanNdG').getAttribute('src'),
                    price: prices[prices.length - 1].innerText,
                };
                cartItems.push(cartItem);
                if (cartItems.length >= cartSize) {
                    break;
                }
            }
            updateCart(cartItems);
            
            // Save 'cartItem' to storage
            chrome.storage.local.set({'cartItem': cartItems}, () => {
                console.log("Local data is set");
            });
            
            // Log the result after everything is done
            chrome.storage.local.get(['username', 'cart', 'cartItem'], result => {
                console.log(result);
            });
        });
    }
}, 200);
