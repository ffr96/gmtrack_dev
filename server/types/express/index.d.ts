import { Request } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ExpressRequest extends Request {
  user: { username: string; id: string } | null;
  token: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user: { username: string; id: string } | null;
      token: string | null;
    }
  }
}
