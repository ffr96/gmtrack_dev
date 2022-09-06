import IUser from '../User';
import { Request } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
