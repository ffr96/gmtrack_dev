import { NextFunction, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { ExpressRequest } from '../types/express';

export const validId = (
  req: ExpressRequest,
  _res: Response,
  next: NextFunction
) => {
  if (isValidObjectId(req.params.id)) return next();
  return next('invalid');
};
