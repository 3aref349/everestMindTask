
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

import tags, { createTag, deleteTag, getTags } from "../../../redux/tags";
import { getCategories } from "../../../redux/categories";


export default function Tag() {


  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    tagName: "",

  });

  const [dataValues, setDataValues] = useState([]);



  const { errors, loading } = useSelector((state) => state.tags);
  const tags = useSelector(state => state.tags)


  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = () => {
    console.log(formValues)
    dispatch(createTag(formValues));
  };
  const getTagsData = () => {

    console.log("get tags")

    return dispatch(getTags());



  };

  //   useEffect(() => {
  //     dispatch(getCategories())
  // }, [])
  return (
    <div>
      <h1 className="title">Tags</h1>

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
            add Tags
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
                name="tagName"
                icon="name"
                iconPosition="left"
                placeholder="tag name"
                onChange={handleChange}
                autoComplete="tagName"
                focus
                required
                error={errors && errors.tagName}
              />


              <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
                Add tag
              </Button>

            </Segment>
          </Form>

        </Grid.Column>

      </Grid>



      <div>
        <Button color={MAIN_COLOR} fluid size="large" loading={loading} onClick={getTagsData}>
          get tags
        </Button>

        <div>
          {tags.tags.map((item) => (
            <div key={item.id}>
              <label htmlFor=""> Tag Name</label>    <p>{item.tagName}</p>
              <div>
                {/* onClick ={()=>{dispatch(deleteArticle({iid:item.id}))}} */}
                <button style={{ color: "red" }} onClick={() => {
                  dispatch(deleteTag({ id: item.id }))
                }
                }>Delete Tag</button>
              </div>
            </div>



          ))}
        </div>


      </div>





    </div>
  );
}

