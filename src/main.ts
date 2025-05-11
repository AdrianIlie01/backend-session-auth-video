import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from "process";
import * as dotenv from 'dotenv';
dotenv.config();

const cookieParser = require('cookie-parser');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({

    origin:[
      process.env.ORIGIN,
      process.env.ORIGIN_RENDER,
      process.env.ORIGIN_REACT,
      'https://react-learn-flax.vercel.app',
      'https://angular-refresh.vercel.app',
      'https://angular-refresh.onrender.com',

      'https://react-learn-3fn37hc78-adrianilie01s-projects.vercel.app',
      'http://localhost:4200',
      'http://localhost:5173'
    ],

    exposedHeaders: ['x-forwarded-for', 'set-cookie'],
    // allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization', 'x-forwarded-for'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-forwarded-for'],

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    credentials: true,
  });

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-forwarded-for');
      res.setHeader('Access-Control-Allow-Origin', 'https://angular-refresh.onrender.com');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      return res.status(200).end();
    }
    next();
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
