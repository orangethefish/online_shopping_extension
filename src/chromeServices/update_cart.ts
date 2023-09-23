// update_cart.ts
export {}
function accessDOM() {
  // Access DOM elements here
  const pageTitle = document.title;
  const allLinks = document.querySelectorAll('a');
  
  // You can interact with DOM elements as needed
  console.log('Page Title:', pageTitle);
  console.log('Number of Links:', allLinks.length);
}

// Call the function to access the DOM
accessDOM();
