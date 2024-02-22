import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      allowedHeaders: '*',
    });

    app.use(compression());

    const port = process.env.PORT || 9001;

    await app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error while bootstrapping the app:', error);
  }
}
bootstrap();
