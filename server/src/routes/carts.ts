import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Category from "../entity/Category";
import Cart from "../entity/Cart";
import User from "../entity/User";
import Order from "../entity/Order";










/** Add  intiate a cart */
const createCart = async (req: Request, res: Response) => {
  
 
  let errors: any = {};
  try {
 console.log("create cart")
 console.log(res.locals.user)
      const user = await User.findOne(res.locals.user.id)


      
      const newCart = await new Cart({ user:user}).save()
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
/** update category */
const updateCart = async (req: Request, res: Response) => {
  let errors: any = {};
 
 
  const { totalPrice, } = req.body;

  console.log(totalPrice);


  if (!totalPrice) errors.name = "cannot be empty !!"

  try {
    if (Object.keys(errors).length > 0) throw new Error("input error");
    const foundCategory = await Cart.findOne({
      where: { id: req.params.id },
    });
    if (!foundCategory) throw new Error(" not found");
    const updatedCategory = await getConnection()
      .createQueryBuilder()
      .update(Cart)
      .set({
      opened:false,
        totalPrice:totalPrice
    
       
      })
      .where( "id = :id",{
        id: req.params.id,
      })
      .execute();
    return res.status(200).json(updatedCategory);
  } catch (error) {
    switch (error.message) {
      case "cart not found":
        return res.status(404).json({ error: error.message });
      case "input error":
        return res.status(403).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};




/** delete category */
const deleteCart = async (req: Request, res: Response) => {
 
  const { id } = req.params;
  try {
    const cart = await Cart.findOne(id);
    if (!cart) throw new Error("category not found");
    console.log(cart)
    await Cart.delete(id);
   

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
const getCart = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
      console.log(id)
      try {
        const cart = await Cart.findOne(id);
        console.log(cart)
        if (!cart) throw new Error("cart not not found");
        return res.status(200).json(cart);
      } catch (error) {
        switch (error.message) {
          case "cart not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };

   

    const getLastCart = async (_: Request, res: Response) => {
      try {
  
        const cart = await Cart.find( { order:{id:"DESC"},take:1
      
      });
       console.log(cart)
      
        return res.status(200).json(cart);
  
      } catch (error) {
        console.log("error");
        return res.status(500).json({ error: "something went wrong" });
      }
    };
    const getCarts = async (_: Request, res: Response) => {

      try {
        console.log( "get carts")
        const carts = await Cart.find();
       //console.log(articles)
        return res.status(200).json(carts);
   
      } catch (error) {
        console.log("error");
        return res.status(500).json({ error: "something wenttdd wrong" });
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

router.post("/" ,user, createCart);
router.put("/:id",updateCart );
router.get("/lastcart",getLastCart)
router.get("/",getCarts);
 router.get("/:id" ,getCart);


router.delete("/:id",deleteCart)

export default router;
