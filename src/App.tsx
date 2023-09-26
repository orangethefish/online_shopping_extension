import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Eye from './pages/Eye';

// This is the interface for the response data from the server
interface ResponseData{
  status?: number;
  username: string;
  cart: number;
}

function App() {
  // The username and cart are stored in state
  const [username, setUsername] = useState('');
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
    // Make a GET request to the server's /index/info endpoint
    axios.get<ResponseData>('http://localhost:5000/user/info')
      // If the request was successful, update the username and cart state
      .then(res => {
        console.log(res.data);
        setUsername(res.data.username);
        setCart(res.data.cart);
      })
      // If the request was not successful, log the error
      .catch(err => {
        console.log(err);
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
    <div className='container text-center'>
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
      <div className="container flex flex-col">
        <button className={`rounded-full bg-amber-300 p-2 btn1 `}>More details</button>
        {!visibility && <button onClick={() => window.open('https://www.shopee.vn/cart', '_blank')} className={`rounded-full bg-amber-300 p-2 btn2`}>Update cart</button>}
      </div>
    </div>
  );
}

export default App;
