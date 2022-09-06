import { NextFunction, Request, Response } from 'express';

/**
 * Makes sure both request id and token id are from the same user.
 */

export const sameUser = (
  req: Request<{ userID: string }>,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id === req.params.userID) return next();
  return next({ message: 'unauthorized' });
};
