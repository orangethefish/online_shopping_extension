import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Eye from './pages/Eye';

interface ResponseData{
  status?: number;
  username: string;
  cart: number;
}
function App() {
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState(0);

  useEffect(() => {
    axios.get<ResponseData>('http://localhost:5000/index/info')
    .then(res => {
        setUsername(res.data.username);
        setCart(res.data.cart);
      })
    .catch(err => {
        console.log(err);
      });
  }, []);
  
  const eyeContainerStyle = {
    display: 'flex',
    justifyContent: 'center', // Horizontally centers the child components
    alignItems: 'center', // Vertically centers the child components
  };
  return (
    <div>
      <header className='text'>
        Hello {username},
      </header>
      <div style={eyeContainerStyle}>
        <Eye />
      </div>
      <p className='text'>We are currently monitoring {cart} item(s)</p>
    </div>
  );
}

export default App;
