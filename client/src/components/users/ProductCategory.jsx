import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'


import { getCategories } from "../../redux/categories";

import {
    Button,
 
} from "semantic-ui-react";
import { MAIN_COLOR } from "../../utilities/theme";
import { Link } from "react-router-dom";

export default function ProductCategory() {
    const dispatch = useDispatch();
    const [category, setCategoryId] = useState();
    const [subcategoriesData, setSubcategoryData] = useState([]);

    const { errors, loading } = useSelector((state) => state.categories);
    const categories = useSelector(state => state.categories)


    const getCategoriesData = () => {
        
        console.log("get Categories")
            
        return dispatch(getCategories());  
       
      };
      const getSubcategoriesbyCategoryID = async () => {
        // const res = await axios.get(`http://localhost:5000/api/product/${category}`)
        const res = await axios.get('http://localhost:5000/api/subcategory/getproductsub')
     
        console.log("here") 
        console.log(res.data) 
        setSubcategoryData(res.data);
         
      }
    return (
        <div>
            <h1>Search Product by category</h1>
            <div>
<Button color={MAIN_COLOR} fluid size="large"    loading={loading} onClick={getCategoriesData}>
              get categories
            </Button>

{/* <div>
<select onChange={(e) => setCategoryId(e.target.value)}>
  {categories.categories.map((item) => (
    <option key={item.id}  value={item.id} > {item.name}</option>
                       ))}
  </select>
</div> */}

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
<h1> suc subtegories</h1>
<button onClick={(e) => getSubcategoriesbyCategoryID()} > get Sub categories by category</button>
{category}
{subcategoriesData.map((item) => (
    <h1 key={item.id}> {item.name}</h1>
                       ))}
     </div>
    );
}
