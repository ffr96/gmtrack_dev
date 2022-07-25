import { Request, Response, NextFunction } from 'express';

export const errorhnd = (
  err: string,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err === 'unauthorized') return res.sendStatus(401);
  if (err === 'invalid') return res.sendStatus(400);
  return res.sendStatus(500);
};
