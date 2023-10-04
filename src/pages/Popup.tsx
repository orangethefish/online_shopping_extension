import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Eye from './Eye';

const bodySize ={
        width: '300px',
        height: '500px'
}
function Popup() {
  const navigate = useNavigate();
  // The username and cart are stored in state
  const [username, setUsername] = useState('No username');
  const [cart, setCart] = useState(0);
  const [visibility, setVisibility] = useState(false);
  // Use useEffect to run this code when the component is first rendered
  useEffect(() => {
    // Get the current tab's URL
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const url = tabs[0]?.url;
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
    <div className='container text-center pop' style={bodySize}>
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
            onClick={() => window.open('https://www.shopee.vn/cart', '_blank')} 
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
