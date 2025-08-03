import { RequestHandler } from 'express';
import { LOGGER } from '../logging';

export const requestloggerMiddleware: RequestHandler = (req, _, next) => {
  LOGGER.info({
    method: req.method,
    path: req.path,
    body: req.body && Object.keys(req.body).length ? req.body : {},
  });
  next();
};
