import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '../api';
import { signJwt, verifyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';
import crypto from 'crypto';

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!existing || existing.password !== hashPassword(password)) {
    return res.status(400).send({ error: "password dosn't match" });
  }

  const jwt = signJwt({ userId: existing.id });

  res.status(200).send({
    user: {
      email: existing.email,
      id: existing.id,
      username: existing.username,
    },
    jwt,
  });
};

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));

  if (existing) {
    return res.status(403).send({ error: 'User already exist' });
  }

  const user: User = {
    id: crypto.randomUUID(),
    username: username,
    email: email,
    password: hashPassword(password),
  };

  await db.createUser(user);

  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({
    jwt,
  });
};

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex');
}

export const validateToken: ExpressHandler<ValidateTokenRequest, ValidateTokenResponse> = async (
  req,
  res
) => {
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

    return res.status(200).send({
      user: {
        email: user.email,
        id: user.id,
        username: user.username,
      },
      jwt: token,
    });
  } catch {
    return res.status(401).send({ error: 'Bad Token' });
  }
};
