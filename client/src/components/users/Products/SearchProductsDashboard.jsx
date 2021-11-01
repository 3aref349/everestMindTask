import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

/** import Redux Slice  */
import { getCategories } from "../../../redux/categories";
import { getProducts } from "../../../redux/products";


export default function Products() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const products = useSelector(state => state.products)

    const [category, setCategoryId] = useState();
    const [productData, setProductData] = useState([]);

    const [searchProductCategory, setSearchedProduuctCategory] = useState([]);



    const getCategoriesData = () => {
        
        console.log("get Categories")
            
        return dispatch(getCategories());  
       
      };

     
    const getProductsData = async () => {
        const res = await axios.get('http://localhost:5000/api/product/'

        )
        console.log("here")

        console.log(res.data)
        setProductData(res.data)


    }



      const search = (e) => {

  
        try {
            console.log("seaech")
        let arrayed=[];
        console.log(productData)
         
            let getarray = [];
            for (var i = 0; i < productData.length; i++) {
                console.log("inside loop")
                console.log(productData)
                console.log(productData[i].category)






            

                // intitae Loop
                if(productData[i].category==category){
                    getarray.push(productData[i]);
                    
                }
                console.log("getarray")
                console.log(getarray);

              

            }
            console.log("after loop")
            console.log("setstate of arrayed")
            console.log(getarray);
            setSearchedProduuctCategory(getarray);

        } catch
        {
            return console.error();
        }
    }
      
      useEffect(() => {
        // getArticle();
        // getProjectDataByProject();
        // getActualCoostdataByProject();
      
        getCategoriesData();
        getProductsData();

    }, []);
    return (
        <div>
            <h1> Search dashboard</h1>
                
    <Link to={`/prodsub/${item.id}`}>
        <button style={{ color: "blue" }} >products by category</button>
    </Link>

            <button>Search By categroies</button>
            <button>Search By categroies</button>
      
        </div>
    )
}
