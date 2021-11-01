import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function OrderByCart() {
    const params = useParams();
    const[orderCart,setOrderCart]=useState([])
    const[sum,setSum]=useState()



    const closeCart =  () => {
      console.log("add an order")
      console.log("get Last Cart")
      
      axios.put(`http://localhost:5000/api/cart/${params.id}`, {
      totalPrice:sum,
      
      
    }
        , {
            withCredentials: true,
        }
    )
    
        .then(function (response) {
            console.log(response);
         
         
    
        })
    }



    const getOrdersByCartId = async () => {
        const res = await axios.get(`http://localhost:5000/api/order/orderbycart/${params.id}`

        )
        console.log("here")

        console.log(res.data)
        setOrderCart(res.data)

    }
    const getSum = async () => {
      const res = await axios.get(`http://localhost:5000/api/order/sumofOrders/${params.id}`

      )
      console.log("here")

      console.log(res.data)
      setSum(res.data)

  }
    
    useEffect(() => {
        getOrdersByCartId();
        getSum();
       
      }, []);
    return (
        <div>
            <h1> get Orders by cartId</h1>
            {orderCart.map((item) => (
    <div key={item.id}   > 
      <p>{item.productName}</p>
    <p>{item.count}</p>
    <p>{item.totalPrice}</p>
    <p>{item.itemPrice}</p>

  
    
    </div>
                       ))}
                     <label htmlFor="">Total Price Of this Cart :{sum}</label>  

                     <button onClick={() => closeCart()}>I will Pay in Cash</button>
        </div>
    )
}
