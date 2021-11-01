import React, { useState, useEffect } from "react";
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

export default function TagPro() {

  const [productData, setProductData] = useState([]);


  const [productName, setProductName] = useState("");

  const [productPrice, setProductPrice] = useState();
  const [tag, setTag] = useState();



  const params = useParams();
  const dispatch = useDispatch();

  const categories = useSelector(state => state.categories);
  const subcategories = useSelector(state => state.subs);
  const tags = useSelector(state => state.tags);
  const products = useSelector(state => state.products);
  const { errors, loading } = useSelector((state) => state.products);


  const [category, setCategoryId] = useState();
  const [subcategory, setSubId] = useState();

  //   const getProduct = async () => {
  //     const res = await axios.get(`http://localhost:5000/api/product/${params.id}`

  //     )
  //     console.log("here")

  //     console.log(res.data)
  //     setProduct(res.data)


  // }


  const update = () => {


    axios.put(`http://localhost:5000/api/product/${params.id}`, {
      productName: productName,
      productPrice: productPrice,
      tag: tag,


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


  useEffect(() => {
    getTags();

  }, []);
  return (
    <div>
      <h1>hey</h1>

      <div className="">
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getTagsData}>
          Choose tag
        </Button>

      </div>
      <div>
        <select onChange={(e) => setTag(e.target.value)}>
          {tags.tags.map((item) => (
            <option key={item.id} value={item.id} > {item.tagName}</option>
          ))}
        </select>

      </div>

      <div className="Form Updatae">
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

            <Form
              size="large"
              onSubmit={(e) => update(e)}
              loading={loading}
            // error={errors}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  name="title"
                  icon="title"
                  iconPosition="left"
                  placeholder="Title "
                  onChange={(e) => setProductName(e.target.value)}
                  autoComplete="email"
                  focus
                  label=" Title"
                  required
                // error={errors && errors.title}
                />

                <Form.Input
                  fluid
                  name="title"
                  icon="title"
                  iconPosition="left"
                  placeholder="Title "
                  onChange={(e) => setProductPrice(e.target.value)}
                  autoComplete="email"
                  focus
                  label=" Title"
                  required
                // error={errors && errors.title}
                />


                <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
                  Add Tag
                </Button>
              </Segment>
            </Form>

          </Grid.Column>
        </Grid>

      </div>
    </div>
  )
}
