import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
import { Link } from "react-router-dom";

export default function Input() {
  const params = useParams();
  const [project, setProject] = useState([]) 
  const [sumActualCost, setSumActualcost] = useState()
  const [sumtotalBudget, setSumTotalBudget] = useState()  

  const [plannedProgress, setPlannedProgress] = useState()  
  const [actualProgress, setActualProgress] = useState() 
  const [dataDate, setDataDate] = useState() 


/** Get last Project  */

const getProjectdefault = async () => {
  try {

    const res = await axios.get('http://localhost:5000/api/projects/default', { withCredentials: true })
    // setDataDefault(res.data)
    console.log(res.data)

  } catch (error) {
    console.log(error)
  }
};




  const getProject = async () => {
    const res = await axios.get(`http://localhost:5000/api/projects/${params.id}`

    )
    console.log("here")

    console.log(res.data)
    setProject(res.data)
    // setDescription(res.data.description)
    // setTitle(res.data.title)
    // setAuthorName(res.data.authorName)
    // setLoading(false)

}

const getSumActualCost = async () => {
  const res = await axios.get(`http://localhost:5000/api/actualcost/${params.id}`)


  console.log("Sum aCtual Cost")

  console.log(res.data)
 
  setSumActualcost(res.data)

}

const getSumProjectData = async () => {
  const res = await axios.get(`http://localhost:5000/api/projectdata/sumprojectdata/${params.id}`

  )
  console.log("here")

  console.log(res.data)
  setSumTotalBudget(res.data)

}


const submit = (e) => {
  e.preventDefault()

  axios.post('http://localhost:5000/api/result/create', {
  
    plannedProgress: plannedProgress,
    actualProgress:actualProgress,
    dataDate:dataDate,

    totalBudget:sumtotalBudget,
    
     
      project:params.id,
      totalActualCost:sumActualCost
      
    
     
  }
  , {
       
    withCredentials: true,
  }
  )
    .then(function (response) {
      console.log(response);
     
    })
}

useEffect(() => {
  getProject();
  getSumActualCost();
  getSumProjectData();

}, []);

  return (
    <div>
      
      <h1 className="title">  Enter Inputs  </h1>
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
              <Form.Input
                fluid
                name="plannedProgress"
                icon="plannedProgress"
                iconPosition="left"
                placeholder="plannedProgress"
               onChange={(e) => setPlannedProgress(e.target.value)} 
                autoComplete="Name"
                focus
                label=" Planned Progress % "
                type="integer"
                required
                // error={errors && errors.title}
              />
         
         
         <Form.Input
                fluid
                name="Actual Progress"
                icon="Actual"
                iconPosition="left"
              
             onChange={(e) => setActualProgress(e.target.value)}
                autoComplete="unitActualCost"
                focus
                required
                label=" Actual Progress % "
                type="integer"
  
                // error={errors && errors.authorName}
              /> 
                   <Form.Input
                fluid
                name="DataDate"
                icon="DataDate"
                iconPosition="left"
              
             onChange={(e) => setDataDate(e.target.value)}
                autoComplete="totalActualCost"
                focus
                required
                label=" DataDate"
                type="date"
  
                // error={errors && errors.authorName}
              /> 

 
              <Button color={MAIN_COLOR} fluid size="large" >
               Submit Result
              </Button>
            </Segment>
          </Form>
          <Link to={`/resultbyproject/${params.id}`}>
        <Button color={MAIN_COLOR} fluid size="large" >
        <Icon size="large" name="share" />  Run
              </Button>
              </Link>
        </Grid.Column>
       
      </Grid>   
        
    </div>




  )
}
