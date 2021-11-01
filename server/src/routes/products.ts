import { Request, Response, Router } from "express";

import { isEmpty } from "class-validator";
// import { error } from "node:console";

import { getConnection } from "typeorm";
import { makeid } from "../utils/helpers";
//Types
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
//middlewears
import admin from "../middlewears/admin";
import auth from "../middlewears/auth";
import user from "../middlewears/user";
import Category from "../entity/Category";
import Product from "../entity/Products";


/*** create product with photo */
const createProduct = async (req: Request, res: Response) => {
  //Initialize Error Object
  const errors: any = {};
  //Get FormDATA from body
  const { productName, productPrice,category,subcategory } = req.body;


  let picture = req.files?.picture as UploadedFile;
    // Validation
  if (isEmpty(productName)) errors.title = "productName cannot be empty";
  if (isEmpty(productPrice)) errors.body = "productPrice cannot be empty";
  if (isEmpty(category)) errors.body = "category cannot be empty";

  if (isEmpty(subcategory)) errors.body = "subcategory cannot be empty";

  try {
    //Throw ERRORS if there's an error
    if (Object.keys(errors).length > 0) throw TypeError("missing inputs");
    //Default file name in case the user didnt upload a picture
    let pictureName = "defaultProduct.jpg";
    //Upload picture if it exists
    if (picture) {
      pictureName = makeid(9) + "." + picture.name.split(".").pop();
      let uploadPath = path.join(
        __dirname,
        "../../",
        "public/uploads/products/",
        pictureName
      );
      picture.mv(uploadPath, (err: any) => {
        if (err) {
          return res.status(403).json("error");
        }
        return;
      });
    }
    // Create product and save it to DB
    const product = await new Product({
      productName, 
      productPrice,
      category,
      subcategory,
      imageUrn: pictureName,
    }).save();
    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "missing inputs") {
      return res.status(401).json(errors);
    } else {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
};



/**end  product with photo*/



/** Add category */
// const createProduct = async (req: Request, res: Response) => {
//   const { productName, productPrice,category,subcategory } = req.body;

//   let errors: any = {};
//   try {
//  console.log("create category")
//       console.log(productPrice);
//       console.log(productName);
//       if (!productName) errors.name = "cannot be empty !!";
//       if (!productPrice) errors.name = "cannot be empty !!";
    
//       if(Object.keys(errors).length>0) throw new Error("cannot be empty !!")
//       const  newproduct = await new Product({ productName, productPrice,category,subcategory}).save()
//       return res.status(200).json(newproduct);
//   } catch (error) {
//       switch (error.message) {
//           case "cannot be empty !!":
//               return res.status(401).json(errors);

//           default:
//               return res.status(500).json({ error: "something went wrong" });
//       }
//   }
// };
/** update category */
const updateProduct = async (req: Request, res: Response) => {
  let errors: any = {};
 
 
  const { tag  , productName, 
    productPrice,
   } = req.body;
  
  console.log(tag);

  if (!tag) errors.name = "cannot be empty !!";
 

  try {
    if (Object.keys(errors).length > 0) throw new Error("input error");
    const foundProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!foundProduct) throw new Error(" not found");


    const updatedProduct = await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set({
        
        productName, 
        productPrice,
        tag
      
      

       
      })
      .where( "id = :id",{
        id: req.params.id,
      })
      .execute();
    return res.status(200).json(updatedProduct);
  } catch (error) {
    switch (error.message) {
      case "product not found":
        return res.status(404).json({ error: error.message });
      case "input error":
        return res.status(403).json(errors);
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** delete category */
const deleteProduct = async (req: Request, res: Response) => {
 
  const { id } = req.body;
  try {
    const product = await Product.findOne(id);
    if (!product) throw new Error("category not found");
    console.log(product)
    await Product.delete(id);
   
    if (product.imageUrn !== "defaultProduct.jpg") {
      let picturePath = path.join(
        __dirname,
        "../../",
        "public/uploads/products/",
        product.imageUrn
      );
      fs.unlink(picturePath, function (err) {
        if (err) throw new Error("something went wrong");
      });
    }
    return res.status(200).json({ success: "product is deleted succefully" });
  } catch (error) {
    console.log(error);
    switch (error.message) {
      case "product not found":
        return res.status(404).json({ error: error.message });
      default:
        return res.status(500).json({ error: "something went wrong" });
    }
  }
};
/** get category */
const getProductBySubCategory = async (req: Request, res: Response) => {
const { id } = req.params;
// const { id } = req.body;
      console.log(id)
      console.log("get products by subcategory id ")
      try {
        const Products = await Product.find({
          where: { subcategory: id }
         
        });
        console.log(Products)
        if (!Products) throw new Error("product not not found");
        return res.status(200).json(Products);
      } catch (error) {
        console.log(error)
        switch (error.message) {
          case "product not not found":
            return res.status(404).json({ error: error.message });
          default:
            return res.status(500).json({ error: "something went wrong" });
        }
      }
    };


    /** get category */
const getproductsbycategory = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
   console.log("get products by subcategory id ")
        console.log(id)
     
        try {
          const Products = await Product.find({
            where: { category: id }
           
          });
          console.log(Products)
          if (!Products) throw new Error("product not not found");
          return res.status(200).json(Products);
        } catch (error) {
          console.log(error)
          switch (error.message) {
            case "product not not found":
              return res.status(404).json({ error: error.message });
            default:
              return res.status(500).json({ error: "something went wrong" });
          }
        }
      };
  
    /** get category */
const getProdcutbyTag = async (req: Request, res: Response) => {
  const { id } = req.params;
   //const { id } = req.body;
   console.log("get products by tag id ")
        console.log(id)
     
        try {
          const Products = await Product.find({
            where: { tag: id }
           
          });
          console.log(Products)
          if (!Products) throw new Error("product not not found");
          return res.status(200).json(Products);
        } catch (error) {
          console.log(error)
          switch (error.message) {
            case "product not not found":
              return res.status(404).json({ error: error.message });
            default:
              return res.status(500).json({ error: "something went wrong" });
          }
        }
      };
/** get categories */

const getProducts = async (_: Request, res: Response) => {
  try {
    
    const products = await Product.find();
   //console.log(products)
    return res.status(200).json(products);

  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "something wenttdd wrong" });
  }
};

const getProductsPaginated = async (_: Request, res: Response) => {
  try {
    const products = await Product.find({
      order: { createdAt: "DESC" },
      take:3
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
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

router.post("/" , createProduct);

router.put("/:id", updateProduct);
router.get("/searchcategory/:id", getproductsbycategory);
router.get("/searchtag/:id", getProdcutbyTag);

router.get("/",getProducts);
router.get("/prodpaginated" , getProductsPaginated);

router.get("/:id" ,getProductBySubCategory);

router.delete("/:id",deleteProduct)

export default router;
