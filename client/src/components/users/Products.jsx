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
import { MAIN_COLOR } from "../../utilities/theme";




import { getCategories } from "../../redux/categories";
import { getSubcategories } from "../../redux/subcategories";
import { getTags } from "../../redux/tags";
import { createSub } from "../../redux/subcategories";
import { createProduct, deleteProduct } from "../../redux/products";

export default function Sub() {

    const [productData, setProductData] = useState([]);

    
    const [productName, setProductName] = useState("");
    
    const [productPrice, setProductPrice] = useState();
    const [tag, setTag] = useState();



    const params = useParams();
    const dispatch = useDispatch();
 
    const categories = useSelector(state => state.categories);
    const subcategories = useSelector(state => state.subs);
    const tags = useSelector(state => state.tags);
     const products = useSelector(state => state.products) ;
    const { errors, loading } = useSelector((state) => state.products);
  
    
    const [category, setCategoryId] = useState();
    const [subcategory, setSubId] = useState();

    const [productDataBySub, setProductDataBySubCategory] = useState([]);
    
    const [formValues, setFormValues] = useState({
      productName: "",
      productPrice: "",
    
    });
//   const getProduct = async () => {
//     const res = await axios.get(`http://localhost:5000/api/product/${params.id}`

//     )
//     console.log("here")

//     console.log(res.data)
//     setProduct(res.data)


// }


  const update = (e) => {
    e.preventDefault()
    
    axios.put(`http://localhost:5000/api/product/${params.id}`, {
        productName:productName,
        productPrice: productPrice,
    
        category:category,
        subcategory:subcategory,
        tag:tag,


    }, {

        withCredentials: true,
    }
    )
        .then(function (response) {

            console.log(response);

        })
}
  const getCategoriesData = () => {
  
  console.log("get Categories")
      
  return dispatch(getCategories());  
  
  
  
  };
  
  
  const SubCategories = () => {
  
  console.log("get sub  Categories")
      
  return dispatch(getSubcategories());      
  };
  const getTagsData = () => {
  
    console.log("get sub  Categories")
        
    return dispatch(getTags());      
    };

    const getSubsByCat = async () => {
        const res = await axios.get(`http://localhost:5000/api/subcategory//${params.id}`

        )
        console.log("here")

        console.log(res.data)
        setSubDataByCategory(res.data)


    }

  useEffect(() => {
    getTags();
  
  }, []);
    return (
        <div>
            <h1>hey</h1>
   
    




<div>
<Button color={MAIN_COLOR} fluid size="large"    loading={loading} onClick={getSubsByCat}>
         get SubCategories by categories
            </Button>

<div>

{/* <h1>{subDataByCategory[0].name}</h1> */}

  
  {subDataByCategory.map((item) => (
      <div  key={item.id} >
    <h1 key={item.id}  value={item.id} > {item.name}</h1>
    </div>
                       ))}
  </div>




</div>



      
        </div>
    )
}
