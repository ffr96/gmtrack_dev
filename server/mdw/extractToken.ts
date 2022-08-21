import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../schemas/users';
import config from '../config/config';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../types/express';

const isJwt = (token: JwtPayload | string): token is JwtPayload => {
  if (typeof token !== 'string') {
    if (token.id !== null && token.username !== null) return true;
  }
  return false;
};

export const tokenExtractor = async (
  request: ExpressRequest,
  _response: Response,
  next: NextFunction
) => {
  try {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      request.token = authorization.substring(7);
      if (config.SECRET) {
        const decodedToken = jwt.verify(request.token, config.SECRET);
        if (isJwt(decodedToken)) {
          request.user = await User.findById(decodedToken.id);
        } else {
          request.user = null;
        }
      } else {
        request.token = null;
      }
    }
  } catch (e) {
    console.log(`ERROR: Can't extract token`);
    return next(e);
  }
  next();
};
