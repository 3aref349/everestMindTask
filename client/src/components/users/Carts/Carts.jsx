import React, { useState,useEffect } from "react";


// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCarts } from "../../../redux/carts";
export default function Carts() {
    const dispatch = useDispatch();
  
    const [cartId, setCartId] = useState();
    const { errors, loading } = useSelector((state) => state.carts);
    const carts = useSelector(state => state.carts)

    const getCartsData = async()=>{


        console.log("get Carts")
            
        return dispatch(getCarts());  
      }


      
  
      useEffect(() => {
        getCartsData();
       
      }, []);
    return (
        <div>
            <h1>Carts</h1>
            {carts.carts.map((item) => (
    <div key={item.id}  value={item.id} > 
    
    <h1> {item.id}</h1>
    
    <Link to={`/order/${item.id}`}>
        <button style={{ color: "blue" }} >update form</button>
    </Link>
    
    
    
    </div>
                       ))}
        </div>
    )
}
