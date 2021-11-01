import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";


//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Category from "../entity/Category";




/** Add category */
const createcategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  let errors: any = {};
  try {
 console.log("create category")
      console.log(name);
      console.log(description);
      if (!name) errors.name = "cannot be empty !!";
    
      if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
      const newCategory = await new Category({ name, description }).save()
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
const updateCategory = async (req: Request, res: Response) => {
  let errors: any = {};
 
 
  const { name, description} = req.body;
  console.log(name)
  console.log(description)
  if (isEmpty(name)) errors.title = "name cannot be empty";
  
  try {
    if (Object.keys(errors).length > 0) throw new Error("input error");
    const foundCategory = await Category.findOne({
      where: { id: req.params.id },
    });
    if (!foundCategory) throw new Error(" not found");
    const updatedCategory = await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({
        name,
        description
       
      })
      .where( "id = :id",{
        id: req.params.id,
      })
      .execute();
    return res.status(200).json(updatedCategory);
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
/** delete category */
const deletecategory = async (req: Request, res: Response) => {
 
  const { id } = req.params;
  try {
    const category = await Category.findOne(id);
    if (!category) throw new Error("category not found");
    console.log(category)
    await Category.delete(id);
   

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
const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
      console.log(id)
      try {
        const category = await Category.findOne(id);
        console.log(category)
        if (!category) throw new Error("category not not found");
        return res.status(200).json(category);
      } catch (error) {
        switch (error.message) {
          case "category not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };
  
/** get categories */

const getCategories = async (_: Request, res: Response) => {
  try {
    
    const categories = await Category.find();
   //console.log(articles)
    return res.status(200).json(categories);

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

router.post("/" , createcategory);
router.put("/:id", updateCategory);

router.get("/",getCategories);
router.get("/:id" ,getCategory);

router.delete("/:id",deletecategory)

export default router;
