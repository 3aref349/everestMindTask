import React, { useState,useEffect } from "react";
import axios from 'axios'

// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//



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
import { MAIN_COLOR } from "../../../utilities/theme";
import { getCategories } from "../../../redux/categories";
import { getSubcategories } from "../../../redux/subcategories";
import { createSub } from "../../../redux/subcategories";
import { createProduct, deleteProduct } from "../../../redux/products";
export default function Products() {
  const dispatch = useDispatch();
 
  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subs);
   const products = useSelector(state => state.products) ;
  const { errors, loading } = useSelector((state) => state.products);

  const [productData, setProductData] = useState([]);
  const [category, setCategoryId] = useState();
  const [subcategory, setSubId] = useState();
  
  const [formValues, setFormValues] = useState({
    productName: "",
    productPrice: "",
  
  });
  const getProductsData = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/product/', { withCredentials: true })
        setProductData(res.data)
        console.log(res.data)

    } catch (error) {
        console.log(error)
    }
};

const handleChange = (e, { name, value }) => {
  setFormValues({ ...formValues, [name]: value,subcategory,category });
};
const handleSubmit = () => {
console.log(formValues)
  dispatch(createProduct(formValues));
  getProductsData();

};
const getCategoriesData = () => {

console.log("get Categories")
    
return dispatch(getCategories());  



};


const SubCategories = () => {

console.log("get Categories")
    
return dispatch(getSubcategories());      
};

useEffect(() => {
  getProductsData();

}, []);
  return (
    <div>
      <h1> Products</h1>
      <div className="Add Product">
       
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
      <div className="get Product Product">
        <h1>get Product Product</h1>
        <div>
        {productData.map((item) => (
            <div key={item.id}>

<Card key={item.id}>

<Image  src={`http://localhost:3000/uploads/products/${item.imageUrn}`} wrapped ui={false} />
<Card.Content>
    <Card.Header>{item.productName}</Card.Header>
    <Card.Meta>{item.productPrice}</Card.Meta>
    <Card.Description>
        {item.createdAt}
    </Card.Description>
</Card.Content>

<Card.Content extra>
    <Link to={`/edit/${item.id}`}>
        <button style={{ color: "blue" }} >update form</button>
    </Link>
    <div>
                {/* onClick ={()=>{dispatch(deleteArticle({iid:item.id}))}} */}
                <button style={{ color: "red" }} onClick={() => {
                  dispatch(deleteProduct({ id: item.id }))
                }
                }>Delete</button>
              </div>
</Card.Content>
</Card>
             
           
        
            </div>


          ))}
        </div>
      </div>
    </div>
  )
}
