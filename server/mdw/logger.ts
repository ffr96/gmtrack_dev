import { Request, Response, NextFunction } from 'express';

/**
 * Logger for incoming/outgoing requests.
 * According to Express Documentation console.log() is not ideal for a production
 * enviroment.
 *
 * TODO: Update logger with async logging.
 */

export const logger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const time = Date().slice(16, 24);
  const url = request.url;
  const method = request.method;
  const ip = request.ip;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = request.body ? request.body : 'empty body';
  console.log('########');
  console.log('\x1b[35m%s\x1b[0m', 'dev mode logging');
  console.log('\x1b[31m%s\x1b[0m', `[${time}]`, method);
  console.log(`to ${url} from ${ip}`);
  console.log('request content: ', body);
  next();
};
