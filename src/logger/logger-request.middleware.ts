// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { NextFunction, Request, Response } from 'express';
//
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   private logger = new Logger('HTTP');
//
//   use(req: Request, res: Response, next: NextFunction): void {
//     const { method, originalUrl, body } = req;
//     const startTime = Date.now();
//
//     // Pretty-print the input (request body) JSON
//     this.logger.log(
//       `Input - ${method} ${originalUrl}:\n${JSON.stringify(body, null, 2)}`,
//     );
//
//     // Intercept the response to capture output
//     const originalSend = res.send;
//     res.send = (data) => {
//       const { statusCode } = res;
//       // Pretty-print the output (response data) JSON
//       const responseData =
//         typeof data === 'string' ? data : JSON.stringify(data, null, 2);
//       if (
//         statusCode.toString().startsWith('4', 0) ||
//         statusCode.toString().startsWith('5', 0)
//       ) {
//         this.logger.error(data);
//       }
//
//       res.send = originalSend; // Restore original send method
//
//       return res.send(data); // Send response to client
//     };
//
//     res.on('finish', () => {
//       const { statusCode } = res;
//       const responseTime = Date.now() - startTime;
//
//       this.logger.log(
//         `Completed - ${method} ${originalUrl} ${statusCode} - ${responseTime}ms`,
//       );
//     });
//
//     next();
//   }
// }

import { NextFunction } from 'express';

const decodeJwt = (token: string) => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

export function loggerRequestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers['authorization'];

  if (authorization) {
    const data = decodeJwt(authorization);
    req.headers['x-request-sub'] = data.sub;
    req.headers['x-request-user-id'] = data.user_id;
    const username = data['preferred_username'] || data['cognito:username'];
    req.headers['x-request-username'] = username;
  }

  next();
}
