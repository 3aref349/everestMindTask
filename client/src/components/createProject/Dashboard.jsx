import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Table } from 'semantic-ui-react'
import { useParams } from "react-router-dom";

import { MAIN_COLOR } from "../../utilities/theme";
import {
    Button,
    Form,
    Grid,
    Segment,
    Card, Icon, Image
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import '../../utilities/my.css'


export default function Dashboard() {
    const params = useParams();
    const [stepOne, setStepOne] = useState(true)
    const [stepTwo, setStepTwo] = useState(false)
    const [popForm, setPopForm] = useState(false)
    const [finsh, setFinish] = useState(false)

    /** Use state Create Project  */
    const [name, setName] = useState("")
    const [location, setLocation] = useState()
    const [contractualStartDate, setContractualStartDate] = useState("")
    const [contractualEndDate, setContractualEndDate] = useState("")
    /** Location */
    const [data, setData] = useState([])
        /** currency */
    const [currencydata, setCurrencyData] = useState([])
    const [currency, setCurrency] = useState()



    /** Use state Create Project Data */
    const [itemDescription, setDescription] = useState("")
    const [Quantitiy, setQuantity] = useState("")
    const [unitBudget, setUnitBudget] = useState("")
    const [unit, setUnit] = useState("")
    const [unitData, setUnitData] = useState([])
    const [projectData, setProjectData] = useState([])

    /** default project */
    const [dataDefault, setDataDefault] = useState([])

    const [projectId, setProjectId] = useState()





    const getLocation = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/location/', { withCredentials: true })
            setData(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };
    const getCurrency = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/currency/', { withCredentials: true })
            setCurrencyData(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };



    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/projects/', {
            Name: name,
            contractualStartDate: contractualStartDate,
            contractualEndDate: contractualEndDate,
            location: location,
            currency:currency
        }
            , {
                withCredentials: true,
            }
        )

            .then(function (response) {
                console.log(response);
                setStepOne(false)
                setStepTwo(true)
                getProjectdefault();
                submitProjectData();

            })
    }
    /**       
    /** Functions  Create Projectdata  */
    const getProjectdefault = async () => {
        try {

            const res = await axios.get('http://localhost:5000/api/projects/default', { withCredentials: true })
         console.log(res.data)
         console.log(res.data[0].id)
            setDataDefault(res.data)
            setProjectId(res.data[0].id)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };

    const getUnit = async () => {
        try {

            const res = await axios.get('http://localhost:5000/api/unit/', { withCredentials: true })
            setUnitData(res.data)
            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    };

    /** get last projectsData  */
    const getProjectDataByProject = async () => {

        try {
            console.log("peoject data before get")
            const id = dataDefault[0].id;
            const res = await axios.get(`http://localhost:5000/api/projectdata/${id}`, { withCredentials: true })
            console.log("projectData by project")
            console.log(res.data)

            setProjectData(res.data)

        } catch (error) {
            console.log(error)
        }


    }


    const submitProjectData = (e) => {
        // e.preventDefault()



        axios.post('http://localhost:5000/api/projectdata/', {
            itemDescription: itemDescription,
            Quantitiy: Quantitiy,
            unitBudget: unitBudget,
            project: projectId,
            unit: unit

        }
            , {

                withCredentials: true,
            }
        )
            .then(function (response) {
                setPopForm(false)
                getProjectDataByProject();
                console.log(response);

            })
    }
    useEffect(() => {
        getLocation();
        getUnit();
        getProjectdefault();
        getProjectDataByProject();
        // getProjects();
        getCurrency();
    }, []);

    return (
        <div>


            {stepOne && !stepTwo ?
                <><Grid
                    padded
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    textAlign="center"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <p style={{ textAlign: 'center', padding: '20px', fontSize: '25px' }}>  <Icon size="large" name="hdd" />  Create a  <span style={{ color: 'blue' }}>   Project</span> </p>

                        <Form
                            size="large"
                            onSubmit={(e) => submit(e)}

                        // error={errors}
                        >
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="name"
                                    icon="name"
                                    iconPosition="left"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label="  Project Name "
                                    required
                                // error={errors && errors.title}
                                />


                                <Form.Input
                                    fluid
                                    name="Contractual Start Date"
                                    icon="date"
                                    iconPosition="left"

                                    onChange={(e) => setContractualStartDate(e.target.value)}
                                    autoComplete="message"
                                    focus
                                    required
                                    label="Contractual Start Date"
                                    type="date"
                                // error={errors && errors.description}
                                />
                                <Form.Input
                                    fluid
                                    name="Contractual End Date"
                                    icon="date"
                                    iconPosition="left"

                                    onChange={(e) => setContractualEndDate(e.target.value)}
                                    autoComplete="firstname"
                                    focus
                                    required
                                    label=" Contractual End date"
                                    type="date"

                                // error={errors && errors.authorName}
                                />
                                <label>Select Country</label>
                                <select onChange={(e) => setLocation(e.target.value)}>

                                    {data.map((item) => (
                                        <option key={item.id} value={item.id}  >{item.Country}</option>
                                    ))}
                                </select>

                                <label>Select Currency</label>
                                <select onChange={(e) => setCurrency(e.target.value)}>

                                    {currencydata.map((item) => (
                                        <option key={item.id} value={item.id} >{item.currency}</option>
                                    ))}
                                </select>



                                <Button color={MAIN_COLOR} fluid size="large" >
                                    Submit  Project
                                </Button>
                            </Segment>
                        </Form>

                    </Grid.Column>
                </Grid> </>
                : <> </>





            }
            {stepTwo ? <>

                <div className="ProjectDiv">


                    <div className="stepTwo_Wrapper">


                        <div className="tableWrapper">
                            <h1 className="title"> Create Project items </h1>
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
                                    {projectData.map((item) => (
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

                            <Form
                                size="large"
                                onSubmit={(e) => submitProjectData(e)}

                            // error={errors}
                            >
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        name="itemDescription"
                                        icon="title"
                                        iconPosition="left"
                                        placeholder="Please Enter item Description "
                                        onChange={(e) => setDescription(e.target.value)}
                                        autoComplete="email"
                                        focus
                                        label="Item description "
                                        required
                                    // error={errors && errors.title}
                                    />


                                    <Form.Input
                                        fluid
                                        name="Quantity"
                                        icon="money"
                                        iconPosition="left"
                                        placeholder="Please Enter  Quantity "
                                        onChange={(e) => setQuantity(e.target.value)}
                                        autoComplete="email"
                                        focus
                                        label="Quantity "
                                        required
                                        type="integer"
                                    // error={errors && errors.title}
                                    />
                                    <Form.Input
                                        fluid
                                        name="unitBudge"
                                        icon="authorname"
                                        iconPosition="left"
                                        placeholder=" Enter Unit BUdget"
                                        onChange={(e) => setUnitBudget(e.target.value)}
                                        autoComplete="Enter Unit BUdget"
                                        focus
                                        required
                                        label=" Unit Budget"
                                        type="integer"

                                    // error={errors && errors.authorName}
                                    />
                                    <select onChange={(e) => setUnit(e.target.value)}>
                                        {unitData.map((x) => (
                                            <option key={x.id} value={x.id}  >{x.unitIdentifier}</option>
                                        ))}
                                    </select>

                                    <Button color={MAIN_COLOR} fluid size="large"   >
                                        Submit Data Row           </Button>
                                </Segment>
                            </Form>
                            <Link to={'/thanks'}>
                            <Button color={MAIN_COLOR} fluid size="large" >
                                        Finish              </Button>
                                        </Link>
                        </Grid.Column>
               
                    </Grid>


                </div>


               
            </> :  stepTwo && popForm ? <>
               <h1>Finished</h1>



            </> : <>




            </>

            }






        </div>


    );
}
