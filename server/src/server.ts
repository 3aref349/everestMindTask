import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import categoryRoutes from './routes/category'
import subcategoryRoutes from './routes/subcategories'
import productsRoutes from './routes/products'
import tagRoutes from './routes/tag'
import cartRoutes from './routes/carts'
import orderRoutes from './routes/orders'

import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.get("/", (req, res) => res.send("Hello World"));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);




app.listen(5000, async () => {
  console.log("Server Is running at http://localhost/5000");
  try {
    await createConnection();
    console.log("DataBase connected!");
  } catch (err) {
    console.log(err);
    console.log(err);
  }
});
