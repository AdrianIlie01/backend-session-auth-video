import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from "process";
import * as dotenv from 'dotenv';
dotenv.config();
import * as bodyParser from 'body-parser';

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
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'x-forwarded-for'],

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    credentials: true,
  });

  app.use(cookieParser());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
