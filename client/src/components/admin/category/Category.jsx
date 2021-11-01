
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useState } from "react";
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

import { createCategory, deletecategory } from "../../../redux/categories";
import { getCategories } from "../../../redux/categories";


export default function Category() {


  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

  const [dataValues, setDataValues] = useState([]);



  const { errors, loading } = useSelector((state) => state.categories);
  const categories = useSelector(state => state.categories)


  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(createCategory(formValues));
  };
  const getCategoriesData = () => {

    console.log("get Categories")

    return dispatch(getCategories());



  };

  //   useEffect(() => {
  //     dispatch(getCategories())
  // }, [])
  return (
    <div>
      <h1 className="title">Categories</h1>

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
            add category
          </Header>
          <Form
            size="large"
            onSubmit={handleSubmit}
            loading={loading}
            error={errors}
          >
            <Segment stacked>
              <Form.Input
                fluid
                name="name"
                icon="name"
                iconPosition="left"
                placeholder="Category Name"
                onChange={handleChange}
                autoComplete="name"
                focus
                required
                error={errors && errors.name}
              />
              <Form.Input
                fluid
                name="description"
                icon="description"
                iconPosition="left"
                placeholder="description"
                onChange={handleChange}
                autoComplete="description"
                focus
                required
                error={errors && errors.description}
              />

              <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
                Add category
              </Button>

            </Segment>
          </Form>

        </Grid.Column>

      </Grid>



      <div>
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getCategoriesData}>
          get categories
        </Button>

        <div>
          {categories.categories.map((category) => (
            <div key={category.id}>
              <label htmlFor=""> Category name :</label>  <p>{category.name}</p>
              <label htmlFor=""> Category Descriprion :</label>    <p>{category.description}</p>
              <div>
                {/* onClick ={()=>{dispatch(deleteArticle({iid:item.id}))}} */}
                <button style={{ color: "red" }} onClick={() => {
                  dispatch(deletecategory({ id: category.id }))
                }
                }>Delete category</button>
              </div>
            </div>


          ))}
        </div>


      </div>





    </div>
  );
}

