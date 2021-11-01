//
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
import { MAIN_COLOR } from "../../utilities/theme";

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

import { login } from "../../redux/auth";


const Login = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const { errors, loading } = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(login(formValues));
  };

  return (
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
          Log-in to your account
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
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
              autoComplete="email"
              focus
              required
              error={errors && errors.email}
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
              required
              error={errors && errors.password}
            />
            <Button color={MAIN_COLOR} fluid size="large" loading={loading}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
