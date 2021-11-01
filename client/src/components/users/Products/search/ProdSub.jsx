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
  Image
} from "semantic-ui-react";
import { MAIN_COLOR } from "../../../../utilities/theme";


export default function ProdSub() {
    const [category, setCategoryId] = useState();
    const [productId, setProductId] = useState();
    const [cartId, setCartId] = useState();
    const [productPrice, setProductPrice] = useState();
  
    const [openBill, setOpenBill] = useState(false);

    const [count, setCount] = useState();
    const params = useParams();
    const [productCategory, setProductCaatgeory] = useState([]);
    const [lastCart, setLastcart] = useState([]);



    const getProductByCategoryId = async () => {
        const res = await axios.get(`http://localhost:5000/api/product/searchcategory/${params.id}`

        )
        console.log("here")

        console.log(res.data)
        setProductCaatgeory(res.data)

    }
    // const addprodData =async () =>{
    //   console.log(productId)

    //   console.log(productPrice)
    //   console.log(count)
    //   console.log(lastCart)
     
    //   // const res = await axios.get(`http://localhost:5000/api/product/searchcategory/${params.id}`)

    // }







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

  useEffect(() => {
    getProductByCategoryId();
   
  }, []);
    return (
        <div className="Warraper">

          <div className="container">


            

{!openBill ? <>
  <button onClick={() => submit()}  >Open a bill</button>
<h1>Hey</h1>






</>:<>
<h1>product can added to cart</h1>

<div>

{/* <h1>{subDataByCategory[0].name}</h1> */}
<Link to={'/carts'}>
<button > Finish Order</button>                  
      </Link>


{productCategory.map((item) => (





  
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
    )
}
