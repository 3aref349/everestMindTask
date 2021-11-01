import React, { useState,useEffect } from "react";
import axios from 'axios'

// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from "semantic-ui-react";
import { MAIN_COLOR } from "../../../utilities/theme";




import { getCategories } from "../../../redux/categories";
import { getSubcategories } from "../../../redux/subcategories";
import { getTags } from "../../../redux/tags";
import { createSub } from "../../../redux/subcategories";
import { createProduct, deleteProduct } from "../../../redux/products";



export default function ProductSub() {

    const products = useSelector(state => state.products) ;
    const { errors, loading } = useSelector((state) => state.products);
    const params = useParams();

    const [productData, setProductData] = useState([{}]);






    const getProductBySubData = async () => {



        const res = await axios.get(`http://localhost:5000/api/product/${params.id}`,{ withCredentials: true }

        )
        console.log("here")
     
        console.log(res.data)
      
     
        setProductData(res.data)


    }

  useEffect(() => {
    getProductBySubData();
  
  }, []);
    return (
        <div>
            <div>

{/* <h1>{subDataByCategory[0].name}</h1> */}
<h1>Products by subs</h1>
  

  {
  
  productData.map((item,index) => (
      <div  key={item.id} >
    <h1   key={item.id}  value={item.id} > {item.productName}</h1>
    </div>
                       ))}
  </div>
        </div>
    )
}
