import { verifyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler } from '../types';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);

    if (!user) {
      throw 'not found';
    }

    res.locals.userId = user.id;

    next();
  } catch {
    return res.status(401).send({ error: 'Bad Token' });
  }
};
