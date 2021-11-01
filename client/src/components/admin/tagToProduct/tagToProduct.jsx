import React, { useState, useEffect } from "react";
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



export default function TagToProduct() {

  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subs);
  const products = useSelector(state => state.products);
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





  // const update = (e) => {
  //   e.preventDefault()

  //   axios.put(`http://localhost:4000/api/articles/${params.id}`, {
  //       description:description,
  //       title: title,

  //       authorName:authorName,


  //   }, {

  //       withCredentials: true,
  //   }
  //   )
  //       .then(function (response) {

  //           console.log(response);

  //       })
  // }
  useEffect(() => {
    getProductsData();

  }, []);

  //   useEffect(() => {
  //     dispatch(getCategories())
  // }, [])
  return (
    <div>
      <h1 className="title">tagProducts</h1>




      <div>

        <h1>get Product Product</h1>
        <div>
          {productData.map((item) => (
            <div key={item.id}>

              <Card key={item.id}>

                <Image src={`http://localhost:3000/uploads/products/${item.imageUrn}`} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{item.productName}</Card.Header>
                  <Card.Meta>{item.productPrice}</Card.Meta>
                  <Card.Description>
                    {item.createdAt}
                  </Card.Description>
                </Card.Content>

                <Card.Content extra>
                  <Link to={`/prodtag/${item.id}`}>
                    <button style={{ color: "blue" }} > Add tag to product</button>
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
  );
}

