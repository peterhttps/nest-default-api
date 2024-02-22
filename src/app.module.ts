import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
