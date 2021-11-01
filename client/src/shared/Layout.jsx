import React from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
import { MAIN_COLOR } from "../utilities/theme";

function Footer() {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      {/* <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" color={MAIN_COLOR}/>
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Terms & services</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services"  color={MAIN_COLOR} />
              <List link inverted>
                <List.Item as="a">Courses</List.Item>
                <List.Item as="a">Articles  </List.Item>
                <List.Item as="a">Help</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted color={MAIN_COLOR}>
                Footer Header
              </Header>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, modi.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container> */}
    </Segment>
  );
}

export default Footer;
