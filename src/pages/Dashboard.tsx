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
        <div style={bodySize}>
            <h1 className="font-mono text-center text-xl font-bold">Tracked Items</h1>
            <div className="flex flex-col">
                {cart.map((item,index)=>{
                    return(
                        <div className="flex flex-col justify-center items-center">
                            <img src={item['image']} alt="product" className="w-32 h-32"/>
                            <p className="font-mono text-center text-xl font-bold">{item['name']}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Dashboard;