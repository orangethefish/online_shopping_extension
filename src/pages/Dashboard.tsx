import { useEffect, useState } from "react";

function Dashboard(){
    const bodySize ={
        width: '700px',
        height: '500px'
    }
    const [cart,setCart]=useState([]);
    useEffect(()=>{
        chrome.storage.local.get(['cartItem'], result => {
            setCart(result['cartItem']);    
        });
    },[]);

    return(
        <div style={bodySize} className="text-center">
            <h1 className="font-mono text-xl font-bold">Tracked Items</h1>
            <div className="container text-left">
                {cart.map((item,index)=>{
                    return(
                        <a href={`https://shopee.vn${item['link']}`} target="_blank" className="flex">
                            <img src={item['image']} alt="product" className="w-20 h-20"/>
                            <p className="font-mono text-sm hover:underline">{item['name']}</p>
                        </a>
                    )
                })}
            </div>
            <button
                onClick={() => window.open('https://www.shopee.vn/cart', '_blank')} 
                className="rounded-full justify-center bg-amber-300 p-2 my-2 mx-auto hover:bg-amber-400 transition duration-150 btn2 w-1/2"
            >
                Not enough? Go to cart
            </button>
        </div>
    )
}
export default Dashboard;