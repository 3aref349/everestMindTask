import { NextFunction, Request, Response } from "express";
import User from "../entity/User";

// middleware to chech if the user is authenticated
export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    console.log("auth middlware")
    const user: User | undefined = res.locals.user;
    console.log("auth middlware")
    console.log(user.disable)
    // if (user.disable !== "false") throw new Error("unauthenticated user");
    if (!user) throw new Error("unauthenticated ya3m el 7ag");
    return next();
  } catch (error) {
    return res.status(401).json({ error: "unauthenticated" });
  }
};
