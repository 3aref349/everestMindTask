import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Category from "../entity/Category";
import Product from "../entity/Products";
import Tag from "../entity/Tag";




/** Add category */
const createTag = async (req: Request, res: Response) => {
  const { tagName } = req.body;

  let errors: any = {};
  try {
 console.log("create tagName")
      console.log(tagName);
    
      if (!tagName) errors.name = "cannot be empty !!";
    
      if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
      const  newTag = await new Tag({tagName}).save()
      return res.status(200).json(newTag);
  } catch (error) {
      switch (error.message) {
          case "cannot be empty !!":
              return res.status(401).json(errors);

          default:
              return res.status(500).json({ error: "something went wrong" });
      }
  }
};
/** update Tag */
const updateTag = async (req: Request, res: Response) => {
  let errors: any = {};
 
  const { tagName } = req.body;
  console.log(tagName);

  if (!tagName) errors.name = "cannot be empty !!";
  
  
  try {
    if (Object.keys(errors).length > 0) throw new Error("input error");
    const foundTag = await Tag.findOne({
      where: { id: req.params.id },
    });
    if (!foundTag) throw new Error(" not found");
    const updatedTag = await getConnection()
      .createQueryBuilder()
      .update(Tag)
      .set({
        tagName

       
      })
      .where( "id = :id",{
        id: req.params.id,
      })
      .execute();
    return res.status(200).json(updatedTag);
  } catch (error) {
    switch (error.message) {
      case "tag not found":
        return res.status(404).json({ error: error.message });
      case "input error":
        return res.status(403).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** delete Tag */
const deleteTag = async (req: Request, res: Response) => {
 
  const { id } = req.params;
  try {
    const tag = await Tag.findOne(id);
    if (!tag) throw new Error("tag not found");
    console.log(tag)
    await Tag.delete(id);
   

    return res.status(200).json({ success: "tag is deleted succefully" });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "tag not found":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** get tag */
const getTag = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
      console.log(id)
      try {
        const tag = await Tag.findOne(id);
        console.log(tag)
        if (!tag) throw new Error("product not not found");
        return res.status(200).json(tag);
      } catch (error) {
        switch (error.message) {
          case "tag not not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };
  
/** get categories */

const getTags = async (_: Request, res: Response) => {
  try {
    
    const tags = await Tag.find();
   //console.log(products)
   console.log("tags")
   console.log(tags)
   console.log("tags")
    return res.status(200).json(tags);

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

router.post("/" , createTag);
router.put("/:id", updateTag);

router.get("/",getTags);
router.get("/:id" ,getTag);

router.delete("/:id",deleteTag)

export default router;
