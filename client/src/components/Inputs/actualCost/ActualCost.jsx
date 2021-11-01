import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";

import { Card, Icon, Image } from 'semantic-ui-react'


import '../../../utilities/my.css'

export default function ActualCost() {

  const [data, setData] = useState([])




  const getProjects = async () => {
    try {

      const res = await axios.get('http://localhost:5000/api/projects/', { withCredentials: true })

      setData(res.data)
      console.log(res.data)

    } catch (error) {
      console.log(error)
    }
  };



  useEffect(() => {


    getProjects();
  }, []);

  return (

    <div className="projectsWrapper">
      <p className="title">    Choose a   <span style={{ color: 'blue' }}>   Project</span></p>

      <div className="container">

        {data.map((item) => (
          <div key={item.id} className="card" >
            <Link to={`/actual/${item.id}`}>
              <a>
              <Icon name='hdd' />
                <b> {item.Name}</b>

              </a>
            </Link>
            <p>  <b>Contractual Start Date Name:</b> {item.contractualStartDate}</p>
      <p>   <b>Contractual Start End Name:</b> {item.contractualEndDate}</p>
          </div>

        ))}
      </div>



    </div>



  )
}
