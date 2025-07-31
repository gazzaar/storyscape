import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '../api';
import { signJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler, User } from '../types';
import crypto from 'crypto';

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.sendStatus(400);
  }

  const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));

  if (!existing || existing.password !== password) {
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
    password: password,
  };

  await db.createUser(user);

  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({
    jwt,
  });
};
