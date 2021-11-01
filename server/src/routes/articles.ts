import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";

const createArticle = async (req: Request, res: Response) => {
    const { article, Title } = req.body;

    let errors: any = {};
    try {
   console.log("create aRticle")
        console.log(Title);
        console.log(article);
        if (!Title) errors.title = "cannot be empty !!";
        if (!article) errors.article = "cannot be empty !!";
        if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
        const newarticle = await new Articles({ article, Title }).save()
        return res.status(200).json(newarticle);
    } catch (error) {
        switch (error.message) {
            case "cannot be empty !!":
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

const getArticle = async (req: Request, res: Response) => {
const { id } = req.params;
 //const { id } = req.body;
    console.log(id)
    try {
      const article = await Articles.findOne(id);
      console.log(article)
      if (!article) throw new Error("article not found");
      return res.status(200).json(article);
    } catch (error) {
      switch (error.message) {
        case "article not found":
          return res.status(404).json({ error: error.message });
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

//!GET ARTICLES
const getArticles = async (_: Request, res: Response) => {
    try {
      
      const articles = await Articles.find();
     //console.log(articles)
      return res.status(200).json(articles);
 
    } catch (error) {
      console.log("error");
      return res.status(500).json({ error: "something wenttdd wrong" });
    }
  };


//Delete Article


const deleteArticle = async (req: Request, res: Response) => {
    console.log("hey")
    const { id } = req.params;
    try {
      const article = await Articles.findOne(id);
      if (!article) throw new Error("article not found");
      console.log(article)
      await Articles.delete(id);
     
  
      return res.status(200).json({ success: "article is deleted succefully" });
    } catch (error) {
      console.log(error);
      switch (error.message) {
        case "article not found":
          return res.status(404).json({ error: error.message });
        default:
          return res.status(500).json({ error: "something went wrong" });
      }
    }
  };

 

  // UPDATE  ARTICLE
const updateArticle = async (req: Request, res: Response) => {
    let errors: any = {};
    console.log("yes")
   
    const { Title, article} = req.body;
    console.log(Title)
    console.log(article)
    if (isEmpty(Title)) errors.title = "title cannot be empty";
    if (isEmpty(article)) errors.article = "body cannot be empty";
    try {
      if (Object.keys(errors).length > 0) throw new Error("input error");
      const foundarticle = await Articles.findOne({
        where: { id: req.params.id },
      });
      if (!foundarticle) throw new Error("article not found");
      const updatedArticle = await getConnection()
        .createQueryBuilder()
        .update(Articles)
        .set({
          Title,
          article
         
        })
        .where( "id = :id",{
          id: req.params.id,
        })
        .execute();
      return res.status(200).json(updatedArticle);
    } catch (error) {
      switch (error.message) {
        case "article not found":
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

router.post("/" , createArticle);
router.put("/:id", updateArticle);

router.get("/",user,auth,admin,getArticles);
router.get("/:id" ,getArticle);

router.delete("/:id",deleteArticle)

export default router;
