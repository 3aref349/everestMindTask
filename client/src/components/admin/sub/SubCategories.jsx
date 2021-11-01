
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

import { createCategory } from "../../../redux/categories";
import { getCategories } from "../../../redux/categories";
import subcategories, { deleteSubcategories, getSubcategories } from "../../../redux/subcategories";
import { createSub } from "../../../redux/subcategories";

export default function Product() {


  const dispatch = useDispatch();



  const [category, setCategoryId] = useState();
  const [name, setName] = useState("");
  const [subId, setSubId] = useState();

  const [formValues, setFormValues] = useState({
    name: "",

  });

  const { errors, loading } = useSelector((state) => state.categories);
  const categories = useSelector(state => state.categories)
  const subcategories = useSelector(state => state.subs)

  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value, category });
  };
  const handleSubmit = () => {
    console.log("categoryid?????????")
    console.log(category)
    console.log(formValues)

    dispatch(createSub(formValues));
  };
  const getCategoriesData = () => {

    console.log("get Categories")

    return dispatch(getCategories());



  };
  const subCategories = () => {

    console.log("get subcategories")

    return dispatch(getSubcategories());



  };

  //   useEffect(() => {
  //     dispatch(getCategories())
  // }, [])
  return (
    <div>
      <h1 className="title">Products</h1>

      <div className="">
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={subCategories}>
          Choose category
        </Button>

        <div>
          <select onChange={(e) => setCategoryId(e.target.value)}>
            {categories.categories.map((item) => (
              <option name="category" key={item.id} value={item.id} > {item.name}</option>
            ))}
          </select>

        </div>


      </div>

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
              <div className="">
                <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getCategoriesData}>
                  Choose category
                </Button>

                <div>
                  <select onClick={(e) => setCategoryId(e.target.value)}>
                    {categories.categories.map((item) => (
                      <option name="category" key={item.id} value={item.id} > {item.name}</option>
                    ))}
                  </select>

                </div>


              </div>
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


              <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
                Add Subcategory
              </Button>

            </Segment>
          </Form>

        </Grid.Column>

      </Grid>





      <div>
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getSubcategories}>
          get sub categories
        </Button>

        <div>
          {subcategories.subcategories.map((item) => (
            <div key={item.id}>
              <label htmlFor=""> SubCategory Name :</label>   <p>{item.name}</p>

              <div>
                {/* onClick ={()=>{dispatch(deleteArticle({iid:item.id}))}} */}
                <button style={{ color: "red" }} onClick={() => {
                  dispatch(deleteSubcategories({ id: item.id }))
                }
                }>Delete sub</button>
              </div>
            </div>


          ))}
        </div>


      </div>

      {/* <div>
<Button color={MAIN_COLOR} fluid size="large"    loading={loading} onClick={SubCategories}>
          Choose subcategory
            </Button>

<div>
  <select onChange={(e) => setSubId(e.target.value)}>
  {categories.categories.map((item) => (
    <option key={item.id}  value={item.id} > {item.name}</option>
                       ))}
  </select>

</div>


</div> */}



    </div>
  );
}

