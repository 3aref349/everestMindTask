import React, { useState,useEffect } from "react";
import axios from 'axios'
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
/** import Redux Slice  */
import { getSubcategories } from "../../../redux/subcategories";




export default function SubCategory() {
    const params = useParams();
    const dispatch = useDispatch();

    
    const [subcategoriesData, setSubcategoryData] = useState([]);

    const subcategories = useSelector(state => state.subs)


    const getSubCategoriesData = () => {
        
        console.log("get Categories")
            
        return dispatch(getSubcategories());  
       
      };

    

    useEffect(() => {
        getSubCategoriesData();
      
      }, []);
    return (
        <div>
            <h1> sub categpry Page</h1>
            <div>

{/* <h1>{subDataByCategory[0].name}</h1> */}

  
  {subcategories.subcategories.map((item) => (
     <div key={item.id}  value={item.id} > 
    
     <h1> {item.name}</h1>
     
     <Link to={`/prod/${item.id}`}>
         <button style={{ color: "blue" }} >update form</button>
     </Link>
     
     
     
     </div>
                       ))}
  </div> 
        </div>
    )
}
