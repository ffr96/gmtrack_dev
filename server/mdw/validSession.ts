import { NextFunction, Request, Response } from 'express';

export const validSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  } else {
    next('unauthorized');
  }
};
