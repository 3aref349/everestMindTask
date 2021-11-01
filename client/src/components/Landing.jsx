//
// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import React from "react";
import { Link } from "react-router-dom";

//
// ─── UI ─────────────────────────────────────────────────────────────────────────
//
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { MAIN_COLOR } from "../utilities/theme";


// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

function Landing() {

  // ────────────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Container  >
        <Message  >
          <Grid textAlign="center"  >
            <Header size="large" as="h1">
              Learning Platform
            </Header>
            <p >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
              reiciendis nihil saepe quas mollitia commodi voluptates sunt
              consequatur tempore dolore ratione possimus velit cum,
              consequuntur fugiat dignissimos placeat deleniti exercitationem
              eaque voluptatibus ullam enim laboriosam!
            </p>
            <Button size="medium" as={Link} color={MAIN_COLOR} to="/register" >
              Sign up today
            </Button>
          </Grid>
        </Message>
      </Container>
      <Segment vertical style={{ display: "flex", justifyContent: "center" }}>
        <Grid padded centered  celled stackable container columns="two" verticalAlign="middle">
          <Grid.Column>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
            <Header as="h4">Subheading</Header>
            <p>
              Donec id elit non mi porta gravida at eget metus. Maecenas
              faucibus mollis interdum.
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                We Help Companies and Companions
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                consectetur saepe ea, sit totam enim mollitia esse eaque velit
                aliquam sunt autem sequi adipisci suscipit numquam quibusdam
                accusantium quis dignissimos!
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                We Make Bananas That Can Dance
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
                iure quo tenetur eveniet laboriosam ipsum temporibus, ipsa
                consectetur repellat fuga.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://react.semantic-ui.com/images/wireframe/white-image.png"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge">Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <Image
                  avatar
                  src="https://react.semantic-ui.com/images/avatar/large/nan.jpg"
                />
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
            inventore ipsa, quas ipsam officiis id? Voluptatem, ut? Vero, porro!
            Ex illo dolorem nemo reiciendis quasi quibusdam veritatis atque sint
            perspiciatis numquam id molestiae quas odit, quo necessitatibus qui.
            Nobis ipsam tenetur cumque vero error ipsum minus adipisci similique
            voluptates fuga.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="#">Case Studies</a>
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae id
            temporibus libero nam! Ducimus veniam, repellendus ipsa quaerat
            maiores ea delectus eos sint placeat quibusdam tempore?
            Reprehenderit, delectus molestiae. Voluptate asperiores facere modi
            in accusamus!
          </p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>
    </>
  );
}

export default Landing;
