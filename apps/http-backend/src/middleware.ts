import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import jwt, { decode } from 'jsonwebtoken';

export default function middleware(req: Request, res: Response, next: NextFunction) {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const token = req.headers['authorization'] ?? '';
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    //   @ts-ignore
    req.userId = decode.userId;
    next();
  } else {
    res.status(403).json({
      message: 'Unauthorized',
    });
  }
}
