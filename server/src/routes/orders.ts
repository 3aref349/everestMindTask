import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import {
  getConnection,

} from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

import Category from "../entity/Category";
import Cart from "../entity/Cart";
import Order from "../entity/Order";
import User from "../entity/User";
import products from "./products";




/** Add Order */
const createOrder = async (req: Request, res: Response) => {
  const { itemPrice ,count,cart,product} = req.body;

  let errors: any = {};
  try {
 console.log("create order")
     
      console.log(itemPrice);
      console.log(count);
      console.log(cart);
      const totalPrice= req.body.itemPrice *req.body.count;
      
      console.log(product);
      
   
     
      // if (!itemPrice) errors.name = "cannot be empty !!"
      
      // if (!count) errors.name = "cannot be empty !!"
      // if (!product) errors.name = "cannot be empty !!"

      // if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
      const newCart = await new Order({ totalPrice,itemPrice ,count,cart,product}).save()
      return res.status(200).json(newCart);
  } catch (error) {
    console.log(error)
      switch (error.message) {
          case "cannot be empty !!":
              return res.status(401).json(errors);

          default:
              return res.status(500).json({ error: "something went wrong" });
      }
  }
};






/** Update change ordered  value to true */


/** delete category */
const deleteOrder = async (req: Request, res: Response) => {
 
  const { id } = req.params;
  try {
    const order = await Order.findOne(id);
    if (!order) throw new Error("order not found");
    console.log(order)
    await Order.delete(id);
   

    return res.status(200).json({ success: "category is deleted succefully" });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "category not found":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** get category */
// const getOrderByCartid= async (req: Request, res: Response) => {
//  const { id } = req.params;
// //const { id } = req.body;
//       console.log(id)
//       try {
//         const orderCart = await Order.find({ where: { cart:id } });
//         console.log(orderCart)
//         if (!orderCart) throw new Error("cart not not found");
//         return res.status(200).json(orderCart);
//       } catch (error) {
//         switch (error.message) {
//           case "orderCart not found":
//             return res.status(404).json({ error: error.message });
//           default:
//             return res.status(500).json({ error: "something went wrong" });
//         }
//       }
//     };

    const geOrdersbyCart = async (req: Request, res: Response) => {
      const { id } = req.params;

 
         console.log("get orders by category id ")
              console.log(id)
           
              try {
                const orders = await Order.find({
                  where: { cart: id },
                
                 
                });
                console.log(orders)
                if (!orders) throw new Error("orders not not found");
                return res.status(200).json(orders);
              } catch (error) {
                console.log(error)
                switch (error.message) {
                  case "orders not not found":
                    return res.status(404).json({ error: error.message });
                  default:
                    return res.status(500).json({ error: "something went wrong" });
                }
              }
      
         };

         const getSumProceOfOrders = async (req: Request, res: Response) => {
          const { id } = req.params;
    
     
             console.log("get Sum pf prders Prices by category id ")
                  console.log(id)
               
                  try {
                    const orders = await Order.find({
                      where: { cart: id },
                    
                     
                    });
                    var cost=0;
                    orders.forEach(element=>
                   cost+= element.totalPrice
                  )
                  console.log(cost)
                   
                    return res.status(200).json(cost);
               
                  } catch (error) {
                    console.log(error)
                    switch (error.message) {
                      case "orders not not found":
                        return res.status(404).json({ error: error.message });
                      default:
                        return res.status(500).json({ error: "something went wrong" });
                    }
                  }
          
             };

// // update article
// const updateArticle = async (req: Request, res: Response) => {
//     const { article, Title } = req.body;
//     let errors: any = {};

//     try {
//         if (Object.keys(errors).length > 0) throw new Error("validation error");
//         // console.log(Title);
//         // console.log(article);

//         const check =await Articles.findOne({Title})
//         console.log(check)
//         if(!check) errors.title = " Title is doesnt exist!!";
//         // if (!Title) errors.title = "cannot be empty !!";
//         // if (!article) errors.article = "cannot be empty !!";
//         const updatedTitle = await new Articles({ article, Title }).save()
//         return res.status(200).json(updatedTitle);
//     } catch (error) {
//         switch (error.message) {
//             case "cannot be empty !!":
//                 return res.status(401).json(errors);

//             default:
//                 return res.status(500).json({ error: "something went wrong" });
//         }


//     }
// };


//get article





//Delete Article




 

  // UPDATE  ARTICLE


const router = Router();
//api/articles
//api/ admin/articles

router.post("/" , createOrder);
router.get("/orderbycart/:id" ,geOrdersbyCart);
router.get("/sumofOrders/:id" ,getSumProceOfOrders);
// router.put("/:id",orderCarts );

//router.get("/",getOrderByCartid);
// router.get("/:id" ,getCart);

router.delete("/:id",deleteOrder);

export default router ;
