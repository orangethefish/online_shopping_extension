import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Eye from './Eye';

const bodySize ={
        width: '300px',
        height: '500px'
}
// async function getCurrentTabId() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab.id;
// }
function Popup() {
  const navigate = useNavigate();
  // The username and cart are stored in state
  const [username, setUsername] = useState('No username');
  const [cart, setCart] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const [tabId, setTabId] = useState(0);
  // Use useEffect to run this code when the component is first rendered
  useEffect(() => {
    // Get the current tab's URL
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
      const url = tabs[0]?.url;
      setTabId(tabs[0]?.id || 0);
      // Check if Cart
      if(url?.includes('cart')) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    })
    chrome.storage.local.get(['username','cart'], result => {
      setUsername(result['username']); 
      setCart(result['cart']);
    });
  }, []);
  
  // This style object is used to center the Eye component horizontally and vertically
  const eyeContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Horizontally centers the child components
    alignItems: 'center', // Vertically centers the child components
  };

  // The JSX to render
  return (
    <div className='container text-center pop decoration-white' style={bodySize}>
      {/* The username is displayed in the header */}
      <header className='text'>
        Hello {username},
      </header>
      {/* The eye is centered using the style object defined above */}
      <div style={eyeContainerStyle}>
        <Eye />
      </div>
      {/* The cart is displayed below the eye */}
      <p className='text'>We are currently monitoring {cart} item(s)</p>
      <div className="container flex flex-col justify-center items-center">
        <button 
            onClick={() => navigate('/dashboard')}
            className="rounded-full bg-amber-300 p-2 my-2 mx-auto hover:bg-amber-400 transition duration-150 btn1 w-1/2"
        >
            More details  
        </button>

        {!visibility && (
        <button
            onClick={() => {
              chrome.tabs.create({url: 'https://www.shopee.vn/',active:false}).then((tab) => {
                chrome.scripting.executeScript({
                  target: {tabId: tab.id || 0},
                  files: ['./scripts/getCartSize.js']})
                chrome.tabs.update(tab.id || 0,{"active":true});
                // setTimeout(() => {
                //   chrome.tabs.remove(tab.id || 0);
                // }, 5000)
            }); 
                
            }} 
            className="rounded-full bg-amber-300 p-2 my-2 mx-auto hover:bg-amber-400 transition duration-150 btn2 w-1/2"
        >
            Update cart
        </button>  
        )}
      </div>
    </div>
  );
}

export default Popup;
