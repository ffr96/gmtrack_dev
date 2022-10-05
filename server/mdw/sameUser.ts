import { ExpressRequest } from '../types/express';
import { NextFunction, Response } from 'express';

/**
 * Makes sure both request id and token id are from the same user.
 */

export const sameUser = (
  req: ExpressRequest & { params: { userID: string } },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.id === req.params.userID) return next();
  return next({ message: 'unauthorized' });
};
