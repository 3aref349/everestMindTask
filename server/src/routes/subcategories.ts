import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Category from "../entity/Category";
import Subcategory from "../entity/SubCategory";




/** Add category */
const createsubcategory = async (req: Request, res: Response) => {
  const { name ,category} = req.body;

  let errors: any = {};
  try {
 console.log("create sub category")
      console.log(name,category);

      if (!name) errors.name = "cannot be empty !!";
    
      if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
      const newCategory = await new Subcategory({ name,category }).save()
      return res.status(200).json(newCategory);
  } catch (error) {
      switch (error.message) {
          case "cannot be empty !!":
              return res.status(401).json(errors);

          default:
              return res.status(500).json({ error: "something went wrong" });
      }
  }
};
/** update category */
const updateSubCategory = async (req: Request, res: Response) => {
  let errors: any = {};
 
 
  const { name,category} = req.body;
  console.log(name)
  console.log(category)
  if (isEmpty(name)) errors.title = "name cannot be empty";
  
  try {
    if (Object.keys(errors).length > 0) throw new Error("input error");
    const foundsubCategory = await Subcategory.findOne({
      where: { id: req.params.id },
    });
    if (!foundsubCategory) throw new Error(" not found");
    const updatedSubCategory = await getConnection()
      .createQueryBuilder()
      .update(Subcategory)
      .set({
        name,
        category
       
      })
      .where( "id = :id",{
        id: req.params.id,
      })
      .execute();
    return res.status(200).json(updatedSubCategory);
  } catch (error) {
    switch (error.message) {
      case "subCategory not found ":
        return res.status(404).json({ error: error.message });
      case "input error":
        return res.status(403).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** delete category */
const deleteSubCategory = async (req: Request, res: Response) => {
 
  const { id } = req.body;
  try {
    const subCategory = await Subcategory.findOne(id);
    if (!subCategory) throw new Error("ubCategory not found");
    console.log(subCategory)
    await Subcategory.delete(id);
   

    return res.status(200).json({ success: "subCategory is deleted succefully" });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "ubCategory not found":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** get SubCategory */
const getSubCategorybycategory = async (req: Request, res: Response) => {
const { id } = req.params;
 // const { id } = req.body;
      console.log(id)
      try {
        const subCategories = await Subcategory.find({
          where: { category: id },
         
        });
        console.log(subCategories)
        if (!subCategories) throw new Error("Subcategories not not found");
        return res.status(200).json(subCategories);
      } catch (error) {
        switch (error.message) {
          case "Subcategory not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };
  
/** get categories */

const getSubCategories = async (_: Request, res: Response) => {
  try {
    
    const subCategories = await Subcategory.find();
   //console.log(articles)
    return res.status(200).json(subCategories);

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

router.post("/" , createsubcategory);
router.put("/:id", updateSubCategory);

router.get("/",getSubCategories);
router.get("/:id" ,getSubCategorybycategory);

router.delete("/:id",deleteSubCategory)

export default router;
