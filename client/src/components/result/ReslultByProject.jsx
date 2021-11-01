import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Table } from 'semantic-ui-react'
export default function ReslultByProject() {
    const params = useParams();

    const [results, setResults] = useState([]) 

    const getResultsByProject = async () => {
        const res = await axios.get(`http://localhost:5000/api/result/${params.id}`
      
        )
        console.log("here")
      
        console.log(res.data)
        setResults(res.data)
      
      }

      useEffect(() => {
        getResultsByProject();
      
      }, []);
    return (
        






<div className="actualtables">


<div className="tableDiv">

  <Table singleLine>

    <Table.Header>

      <Table.Row>

        <Table.HeaderCell>Data Date</Table.HeaderCell>
        <Table.HeaderCell> earned Value</Table.HeaderCell>
        <Table.HeaderCell> Planned Value</Table.HeaderCell>
        <Table.HeaderCell> schedule Performance Index</Table.HeaderCell>
        <Table.HeaderCell> Cost Performance Index</Table.HeaderCell>
        <Table.HeaderCell> Schedule Varience</Table.HeaderCell>
        <Table.HeaderCell> Cost Variance</Table.HeaderCell>
        <Table.HeaderCell> Estimate Completion</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {results.map((item , index) => (
        <Table.Row key={item.id}>
             <Table.Cell>{item.dataDate}</Table.Cell>
          <Table.Cell>{item.earnedValue}</Table.Cell>
          <Table.Cell>{item.plannedValue}</Table.Cell>
          <Table.Cell>{item.schedulePerformanceIndex}</Table.Cell>
          <Table.Cell>{item.costPerformanceIndex}</Table.Cell>
          <Table.Cell>{item.scheduleVarience}</Table.Cell>
          <Table.Cell>{item.costVariance}</Table.Cell>
          <Table.Cell>{item.estimateCompletion}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</div>

</div>

        
    )
}
