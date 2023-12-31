const checkDOM = setInterval(() => {
    const content = document.querySelector('.shopee-cart-number-badge');
    if(content){
        clearInterval(checkDOM); 
        const cartSize = Number(content.innerHTML);
        const username = document.querySelector('.navbar__username').innerText;
        chrome.storage.local.set({ 'username' : username,'cart':cartSize}).then(() => {
            console.log(`Local data is set for ${username} with ${cartSize} items in cart`);
        });
        chrome.storage.local.get(['username','cart'], result => {
            console.log(result);
        });
        // chrome.runtime.sendMessage({redirect: "http://shopee.vn/cart"});
    }
}, 200);