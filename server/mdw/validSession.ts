import { NextFunction, Response } from 'express';
import { ExpressRequest } from '../types/express';

export const validSession = (
  req: ExpressRequest,
  _res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  } else {
    next({ message: 'unauthorized' });
  }
};
