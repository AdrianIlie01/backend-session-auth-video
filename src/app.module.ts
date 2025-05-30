import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { RoomModule } from './room/room.module';
import { StripeModule } from './stripe/stripe.module';
import { UserInfoModule } from './user-info/user-info.module';
import { VideoModule } from './video/video.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OtpModule } from './otp/otp.module';
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";
import { ConfigModule } from "@nestjs/config";
import { TokenBlackListModule } from './token-black-list/token-black-list.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      // port:  3306,
      // username: 'livestream',
      // password: 'livestream',
      // database: 'livestream',
      host: process.env.MYSQL_ADDON_HOST,
      port:  +process.env.MYSQL_ADDON_PORT,
      username: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.register( {
      secret: process.env.SECRET_JWT,
      signOptions: {
        expiresIn: process.env.EXPIRES_IN_JWT,
      }
    }),
    UserModule,
    AuthModule,
    MailModule,
    RoomModule,
    StripeModule,
    UserInfoModule,
    VideoModule,
    OtpModule,
    TokenBlackListModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
