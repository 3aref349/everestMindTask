import React, { useState,useEffect } from "react";
import axios from 'axios'

// ─── REACT REDUX ────────────────────────────────────────────────────────────────
//
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    Button,
    Form,
    Grid,
    Header,
    Icon,
    Message,
    Segment,
    Card, Image 
  } from "semantic-ui-react";
import { MAIN_COLOR } from "../../../../utilities/theme";
import  { createOrder } from "../../../../redux/orders"
export default function ProdTag() {
  const dispatch = useDispatch();



  const [productId, setProductId] = useState();
  const [cartId, setCartId] = useState();
  const [productPrice, setProductPrice] = useState();

  const [openBill, setOpenBill] = useState(false);

  const [count, setCount] = useState();
  
    
    const params = useParams();
    const [productTag, setProductTag] = useState([]);
    
    const [formValues, setFormValues] = useState({
      name: "",
      description: "",
  });

  const handleChange = (e, { name, value }) => {
    setFormValues({ ...formValues, [name]: value });
};
const handleSubmit = () => {
    dispatch(createOrder(formValues));
};


const getlastCart = async()=>{


  const res=  await axios.get('http://localhost:5000/api/cart/lastcart');
  console.log("Last Cart")
  console.log(res.data);
  console.log("Last Cart ?")
  console.log(res.data[0].id);
  setCartId(res.data[0].id);
  

}

const submit = () => {
      
  axios.post('http://localhost:5000/api/cart/', 
       {
          withCredentials: true,
      }
  )

      .then(function (response) {
      
          console.log(response);
          console.log("getting  hhhhhhhhhhhlast cart")
       setOpenBill(true);
       getlastCart();
     
      })
  
}
const addOrder =  () => {
  console.log("add an order")
  console.log("get Last Cart")
  
  axios.post('http://localhost:5000/api/order/', {
  itemPrice:productPrice,
  count:count,
  cart:cartId,
  product:productId
  
}
    , {
        withCredentials: true,
    }
)

    .then(function (response) {
        console.log(response);
     
     

    })
}
    const getProductByTagId = async () => {
        const res = await axios.get(`http://localhost:5000/api/product/searchtag/${params.id}`

        )
        console.log("here")

        console.log(res.data)
        setProductTag(res.data)
        


    }



  useEffect(() => {
    getProductByTagId();
  
  }, []);
    return (
        <div>
<button onClick={submit()}> OpenCart</button>
            <div>

{/* <h1>{subDataByCategory[0].name}</h1> */}

<h1>product by Tag</h1>
<div>

{!openBill ? <>
  <button onClick={() => submit()}  >Open a bill</button>
<h1>Hey</h1>






</>:<>
<h1>product can added to cart</h1>

<div>

{/* <h1>{subDataByCategory[0].name}</h1> */}


{productTag.map((item) => (





  
<div  key={item.id} >
<Image  src={`http://localhost:3000/uploads/products/${item.imageUrn}`} wrapped ui={false} />

<h1 key={item.id}  value={item.id} > {item.productName}</h1>
<input type="text" value={item.id} onClick={(e) => setProductId(e.target.value)} />

<input type="integer"  onChange={(e) => setCount(e.target.value)}     />
<input type="integer" value={item.productPrice}  onClick={(e) => setProductPrice(e.target.value)} />
<button onClick={() => addOrder()} >Add</button>

</div>
           ))}
           <button onClick={() => addOrder()} >Add</button>
</div>



</>


}



</div>

  
  </div>
  
        </div>
    )
}
