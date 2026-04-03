import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import middleware from './middleware';
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from '@repo/common/types';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());

const PORT = 3000;

app.post('/signup', (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: 'Incorrect Input',
    });
    return;
  }
  res.json({
    userId: 123456,
  });
});

app.post('/signin', (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: 'Incorrect Input',
    });
    return;
  }

  const userId = 1;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'default_secret');

  res.json({
    token,
  });
});

app.post('/room', middleware, (req, res) => {
  // DB Call
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: 'Incorrect Input',
    });
    return;
  }

  res.json({
    roomId: 123456,
  });
});

app.listen(PORT, () => {
  console.log('Server Started !!');
});
