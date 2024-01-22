import { Request, Response, NextFunction } from "express";

export const helper = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date()}]`, `[${req.method}]`, req.path)
  next()
}