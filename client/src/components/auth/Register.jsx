//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { register } from "../../redux/auth";
import { Link } from "react-router-dom";
const Register = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });
  const { errors, loading } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(register(formValues));
  };

  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Grid textAlign="center" >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          Register a new account
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
              name="firstname"
              icon="user"
              iconPosition="left"
              placeholder="Firstname"
              onChange={handleChange}
              error={errors && errors.firstname}
              required
            />
            <Form.Input
              fluid
              name="lastname"
              icon="user"
              iconPosition="left"
              placeholder="Lastname"
              onChange={handleChange}
              error={errors && errors.lastname}
              required
            />
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={handleChange}
              error={errors && errors.username}
              required
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
              error={errors && errors.email}
              autoComplete="email"
              required
            />

            <Form.Input
              fluid
              name="password"
              autoComplete="current-password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              error={errors && errors.password}
              required
            />
            <Button color="twitter" fluid size="large">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          you already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
