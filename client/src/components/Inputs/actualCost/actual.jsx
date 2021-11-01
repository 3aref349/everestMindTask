
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Icon,
    Segment,
} from "semantic-ui-react";
import '../../../utilities/my.css'
import { Table } from 'semantic-ui-react'
import { MAIN_COLOR } from "../../../utilities/theme";
import { Link } from "react-router-dom";

export default function Actual() {
    const params = useParams();
    const [actualQuantitiy, setActualQuantity] = useState()
    const [unitActualCost, setUnitActualCost] = useState()
    const [totalActualCost, setTotalActualCost] = useState()
    const [projectdata, setProjectData] = useState()
    const [projectdataArray, setProjectDataArray] = useState([])
    const [actualCost, setActualCost] = useState([])



    const [project, setProject] = useState([])
    const [data, setData] = useState([[]])









    const getArticle = async () => {
        const res = await axios.get(`http://localhost:5000/api/projects/${params.id}`

        )
        console.log("here")

        console.log(res.data)
        setProject(res.data)


    }
    const getProjectDataByProject = async () => {


        try {

            const res = await axios.get(`http://localhost:5000/api/projectdata/${params.id}`, { withCredentials: true })
            console.log("data elements")
            console.log(res.data)
            setProjectDataArray(res.data)

        } catch (error) {
            console.log(error)
        }


    }


    const getActualCoostdataByProject = async () => {

        try {

            const res = await axios.get(`http://localhost:5000/api/actualcost/data/${params.id}`, { withCredentials: true })
            console.log("actual cost elements")
            console.log(res.data)
            setActualCost(res.data)

        } catch (error) {
            console.log(error)
        }


    }

    const submit = (e) => {
        e.preventDefault()
        console.log(data[0])
        axios.post('http://localhost:5000/api/actualcost/create', {

            actualQuantity: actualQuantitiy,
            unitActualCost: unitActualCost,
         
            projectdata: projectdata,
            project: params.id


        }
            , {

                withCredentials: true,
            }
        )
            .then(function (response) {
                console.log(response);
                getActualCoostdataByProject();

            })
    }

    useEffect(() => {
        getArticle();
        getProjectDataByProject();
        getActualCoostdataByProject();

    }, []);

    console.log(project)
    console.log(data)
    console.log(projectdata)
    return (

        <div className="ActualWrapper">

            <div className="actualtables">

                <div className="tableDiv">

                    <Table singleLine>

                        <Table.Header>

                            <Table.Row>


                                <Table.HeaderCell>Item Description</Table.HeaderCell>
                                <Table.HeaderCell> Item Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Unit Budget</Table.HeaderCell>
                                <Table.HeaderCell>Unit Total Budget</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {projectdataArray.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.itemDescription}</Table.Cell>
                                    <Table.Cell>{item.Quantitiy}</Table.Cell>
                                    <Table.Cell>{item.unitBudget}</Table.Cell>
                                    <Table.Cell>{item.totalBudget}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>


                <div className="tableDiv">

                    <Table singleLine>

                        <Table.Header>

                            <Table.Row>

                                <Table.HeaderCell>Actual Quantity</Table.HeaderCell>
                                <Table.HeaderCell>Unit Actual Cost</Table.HeaderCell>
                                <Table.HeaderCell>Total Actual Cost</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {actualCost.map((item, index) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>{item.actualQuantity}</Table.Cell>
                                    <Table.Cell>{item.unitActualCost}</Table.Cell>
                                    <Table.Cell>{item.totalActualCost}</Table.Cell>

                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>



                </div>


            </div>


            <div>
            <p  className="title" >    Create a <span style={{ color: 'blue' }}> Actual Cost <Icon size="small" name="dollar" /></span></p>

                <div>

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
                                onSubmit={(e) => submit(e)}

                            // error={errors}
                            >
                                <Segment stacked>

                                <select onClick={(e) => setProjectData(e.target.value)}>
                                        {projectdataArray.map((item, index) => (
                                            <option index={index} key={item.id} value={item.id}  >{item.itemDescription}</option>
                                        ))}
                                    </select> 

                                    <Form.Input
                                        fluid
                                        name="actualQuantity"
                                        icon="actualQuantity"
                                        iconPosition="left"
                                        placeholder="actualQuantity"
                                        onChange={(e) => setActualQuantity(e.target.value)}
                                        autoComplete="Name"
                                        focus
                                        label="  Actual Quantity  "
                                        required
                                    // error={errors && errors.title}
                                    />


                                    <Form.Input
                                        fluid
                                        name="unitActualCost"
                                        icon="unitActualCost"
                                        iconPosition="left"

                                        onChange={(e) => setUnitActualCost(e.target.value)}
                                        autoComplete="unitActualCost"
                                        focus
                                        required
                                        label=" unitActualCost  "
                                        type="integer"

                                    // error={errors && errors.authorName}
                                    />
                            
                                
                                    <Button color={MAIN_COLOR} fluid size="large" >
                                       Submit
                                    </Button>

                                </Segment>
                            </Form>
                          
                            <Link to={`/input/${params.id}`}>
                                <Button color={MAIN_COLOR} fluid size="large" >
                                    Complete Inputs <Icon size="large" name="arrow right" />
                                </Button>
                            </Link>
                        </Grid.Column>
                    </Grid>
                </div>

            </div>


        </div>



    )
}
