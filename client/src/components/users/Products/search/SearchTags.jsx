import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

/** import Redux Slice  */
import { getTags } from "../../../../redux/tags";
import { getProducts } from "../../../../redux/products";
import { Link } from "react-router-dom";

import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
    Card, Image 
  } from "semantic-ui-react";
export default function SearchTags() {
    const dispatch = useDispatch();
 
    const categories = useSelector(state => state.categories);
    const subcategories = useSelector(state => state.subs);
     const products = useSelector(state => state.products) ;
    const { errors, loading } = useSelector((state) => state.products);
  
    const [tagData, setTagData] = useState([]);
    const [category, setCategoryId] = useState();
    const [subcategory, setSubId] = useState();
    
    const [formValues, setFormValues] = useState({
      productName: "",
      productPrice: "",
    
    });
    const getTagsData = async () => {
      try {
          const res = await axios.get('http://localhost:5000/api/tag/', { withCredentials: true })
          setTagData(res.data)
          console.log(res.data)
  
      } catch (error) {
          console.log(error)
      }
  };

    const getProdData = () => {

        console.log("get tags")

        return dispatch(getProducts());

    };
    useEffect(() => {
        getTagsData();
      
      }, []);
    return (
        <div>
            <h1>Search Products  by tags</h1>
            <div>
        {tagData.map((item) => (
            <div key={item.id}>

<Card key={item.id}>

<Card.Content>
    <Card.Header>{item.tagName}</Card.Header>
    
    <Card.Description>
        {item.createdAt}
    </Card.Description>
</Card.Content>

<Card.Content extra>
    <Link to={`/prodtag/${item.id}`}>
        <button style={{ color: "blue" }} >update form</button>
    </Link>
   
</Card.Content>
</Card>
             
           
        
            </div>


          ))}
        </div>
        </div>
    )
}
