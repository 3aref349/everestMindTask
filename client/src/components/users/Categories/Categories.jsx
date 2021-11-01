import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

/** import Redux Slice  */
import { getCategories } from "../../../redux/categories";

import {
    Button,
 
} from "semantic-ui-react";
import { MAIN_COLOR } from "../../../utilities/theme";
import { Link } from "react-router-dom";



export default function Categories() {
    const dispatch = useDispatch();
    const [category, setCategoryId] = useState();
    const [subcategoriesData, setSubcategoryData] = useState([]);

    const { errors, loading } = useSelector((state) => state.categories);
    const categories = useSelector(state => state.categories)


    /**get categories data */
    const getCategoriesData = () => {
        
        console.log("get Categories")
            
        return dispatch(getCategories());  
       
      };

    /**get sub  data */
    const getSubcategoriesbyCategoryID = async () => {
        // const res = await axios.get(`http://localhost:5000/api/product/${category}`)
        const res = await axios.get('http://localhost:5000/api/subcategory/getproductsub')
     
        console.log("here") 
        console.log(res.data) 
        getCategoriesData(res.data);
         
      }


      useEffect(() => {
        // getArticle();
        // getProjectDataByProject();
        // getActualCoostdataByProject();
        getCategoriesData();

    }, []);

    return (
        <div>
            <h1> Catgeries Page </h1>
            <div>
{categories.categories.map((item) => (
    <div key={item.id}  value={item.id} > 
    
    <h1> {item.name}</h1>
    
    <Link to={`/sub/${item.id}`}>
        <button style={{ color: "blue" }} >update form</button>
    </Link>
    
    
    
    </div>
                       ))}
</div>
        </div>
    )
}
