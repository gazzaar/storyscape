import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('Uncought Error', err);
  return res.status(500).send('Oops, an unExpected Error happend, please try again');
};
