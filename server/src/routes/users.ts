import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt_decode from "jwt-decode";

//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import User from "../entity/User";

const createUser = async (req: Request, res: Response) => {
    //GET VALUES
    const { username, password } = req.body;
    const email = req.body.email.toLowerCase();
    let errors: any = {};
  
    try {
      // Create the user
      //TODO
      //check if email or username are already taken
      //hash password using bcrypt
  
  
  
      // // Create the user
  
      //check if email or username are already taken
  
      const userEmail = User.findOne(email);
  
      if (userEmail) errors.email = "Sorry , this email used before !!";
  
  
      //hash password using bcrypt
  
      const password = await bcrypt.hash(req.body.password, 6)
  
  
      const user = await new User({ email, password, username }).save()
      console.log("values saved in db")
  
  
  
  
      // Return it ( u can return anything)
      return res.status(200).json(user);
    } catch (error) {
      console.log(error)
      switch (error.message) {
        //TODO
        //handle errors (email or username already taken)
        case "Sorry , this email used before !!":
          return res.status(401).json(errors);
        case "Sorry , this username  used before !!":
          return res.status(401).json(errors);
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

// const getArticle = async (req: Request, res: Response) => {
// const { id } = req.params;
//  //const { id } = req.body;
//     console.log(id)
//     try {
//       const article = await Articles.findOne(id);
//       console.log(article)
//       if (!article) throw new Error("article not found");
//       return res.status(200).json(article);
//     } catch (error) {
//       switch (error.message) {
//         case "article not found":
//           return res.status(404).json({ error: error.message });
//         default:
//           return res.status(500).json({ error: "something went wrong" });
//       }
//     }
//   };

//!GET ARTICLES
const getUsers = async (_: Request, res: Response) => {
    try {
      
      const users = await User.find();
     //console.log(articles)
      return res.status(200).json(users);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something wenttdd wrong" });
    }
  };


//Delete Article


// const deleteArticle = async (req: Request, res: Response) => {
//     console.log("hey")
//     const { id } = req.params;
//     try {
//       const article = await Articles.findOne(id);
//       if (!article) throw new Error("article not found");
//       console.log(article)
//       await Articles.delete(id);
     
  
//       return res.status(200).json({ success: "article is deleted succefully" });
//     } catch (error) {
//       console.log(error);
//       switch (error.message) {
//         case "article not found":
//           return res.status(404).json({ error: error.message });
//         default:
//           return res.status(500).json({ error: "something went wrong" });
//       }
//     }
//   };

 

  // UPDATE  ARTICLE
const updateUser = async (req: Request, res: Response) => {
    let errors: any = {};
    console.log("yes")
   
    const { disable} = req.body;
    console.log(disable)
  
    if (isEmpty(disable)) errors.title = "tdisable itle cannot be empty";
    try {
      if (Object.keys(errors).length > 0) throw new Error("input error");
      const founduser = await User.findOne({
        where: { id: req.params.id },
      });
      if (!founduser) throw new Error("article not found");
      const updatedUser = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({
            disable
       
         
        })
        .where( "id = :id",{
          id: req.params.id,
        })
        .execute();
      return res.status(200).json(updatedUser);
    } catch (error) {
      switch (error.message) {
        case "user not found":
          return res.status(404).json({ error: error.message });
        case "input error":
          return res.status(403).json(errors);
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

const router = Router();
//api/articles
//api/ admin/articles

router.post("/" , createUser);
router.put("/:id", updateUser);

router.get("/",getUsers);
// router.get("/:id" ,getArticle);

// router.delete("/:id",deleteArticle)

export default router;
