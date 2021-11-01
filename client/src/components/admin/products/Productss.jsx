
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//


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

// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import  { createCategory } from "../../../redux/categories";
import { getCategories } from "../../../redux/categories";
import { getSubcategories } from "../../../redux/subcategories";
import { createSub } from "../../../redux/subcategories";
import { createProduct, deleteProduct } from "../../../redux/products";
// import { getProducts } from "../../../redux/products";
export default function Product() {

   
        const dispatch = useDispatch();

     

const [category, setCategoryId] = useState();
const [subcategory, setSubId] = useState();

const [formValues, setFormValues] = useState({
  productName: "",
  productPrice: "",

});

      
        
        const { errors, loading } = useSelector((state) => state.products);
        const categories = useSelector(state => state.categories);
        const subcategories = useSelector(state => state.subs);
        const products = useSelector(state => state.products) ;
       
             

        const handleChange = (e, { name, value }) => {
            setFormValues({ ...formValues, [name]: value,subcategory,category });
        };
        const handleSubmit = () => {
          console.log(formValues)
            dispatch(createProduct(formValues));

        };
        const getCategoriesData = () => {
        
          console.log("get Categories")
              
          return dispatch(getCategories());  
          
         
          
        };

  
        const SubCategories = () => {
        
          console.log("get Categories")
              
          return dispatch(getSubcategories());      
        };

        const getProductdata = () => {
        
          console.log("get Product")
              
          return dispatch(getProducts());  
          
        };

      //   useEffect(() => {
      //     dispatch(getProducts())
      // }, [])
        return (

          <div>

<div> 



                <h1 className="title">Products</h1>

                <Grid
      padded
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      textAlign="center"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Icon size="huge" name="user circle" />
        <Header as="h2" color={"black"} textAlign="center">
         add product
        </Header>
        <Form
          size="large"
          onSubmit={handleSubmit}
          loading={loading}
          error={errors}
        >
          <Segment stacked>
          <div className="">
<Button color={MAIN_COLOR} fluid size="large"    loading={loading} onClick={getCategoriesData}>
          Choose category
            </Button>

<div>
  <select onChange={(e) => setCategoryId(e.target.value)}>
  {categories.categories.map((item) => (
    <option key={item.id}  value={item.id} > {item.name}</option>
                       ))}
  </select>

</div>


</div>

<div>
<Button color={MAIN_COLOR} fluid size="large"    loading={loading} onClick={SubCategories}>
          Choose subcategory
            </Button>

<div>
  <select onChange={(e) => setSubId(e.target.value)}>
  {subcategories.subcategories.map((item) => (
    <option key={item.id}  value={item.id} > {item.name}</option>
                       ))}
  </select>

</div>


</div>
            <Form.Input
              fluid
              name="productName"
              icon="productName"
              iconPosition="left"
              placeholder="productName "
              onChange={handleChange}
              autoComplete="name"
              focus
              required
              error={errors && errors.productName}
            />
                 <Form.Input
              fluid
              name="productPrice"
              icon="productPrice"
              iconPosition="left"
              placeholder="productPrice "
              onChange={handleChange}
              autoComplete="productPrice"
              focus
              required
              error={errors && errors.productPrice}
            />
        
         
            <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
              Add Product
            </Button>
           
          </Segment>
        </Form>

      </Grid.Column>
     
    </Grid>
 


     

            </div>







<div>
  <h1>hey</h1>
  
  <div>
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getProductdata}>
          get  Product
        </Button>

        <div>
        {products.products.map((item) => (
            <div key={item.id}>
              <p>{item.productName}</p>

              <div>
                {/* onClick ={()=>{dispatch(deleteArticle({iid:item.id}))}} */}
                <button style={{ color: "red" }} onClick={() => {
                  dispatch(deleteProduct({ id: item.id }))
                }
                }>Delete</button>
              </div>
            </div>


          ))}
        </div>


      </div>
</div>
          </div>
            
        );
    }

