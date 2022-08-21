import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';

export const errorhnd = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof Error.ValidationError) {
    return res.status(400).json({ message: 'Missing or invalid data' });
  }

  if (err.message === 'unauthorized') {
    return res.sendStatus(401);
  }

  console.log(err);
  return res.sendStatus(500);
};
