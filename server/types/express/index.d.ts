import IUser from '../User';
import { Request } from 'express';
export interface ExpressRequest extends Request {
  user: IUser | null;
  token: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser | null;
      token: string | null;
    }
  }
}
