import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    // we want to assign currentUser property to req, but as this is typescript, it means we are accessing currentuser ffrom req, which we are not
    // therefore, we need to assign currentuser to req
    // refer declare global defined above, we are telling Request interface from Express to have a property of currentUser
    req.currentUser = payload;
  } catch (error) {}

  next();
};
