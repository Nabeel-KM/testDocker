import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerOptions } from 'socket.io';
import { AppModule } from './app.module';

export class SocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: ServerOptions & {
      namespace?: string;
      server?: any;
    },
  ) {
    const server = super.createIOServer(port, { ...options, cors: true });
    return server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useWebSocketAdapter(new SocketAdapter(app));

  /**
   * cors
   */
  app.enableCors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  });

  /**
   * Importing config module (.env and other settings)
   */
  const config: ConfigService = app.get(ConfigService);

  /**
   * global validation pipes setup
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  /**
   * swagger setup for documentation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('STX Wallet - API')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'STX Wallet - API',
  });

  // app.useStaticAssets(join(__dirname, '..', 'static'));

  await app.listen(process.env.PORT, () =>
    console.log(`Server started on port: ${process.env.PORT}`),
  );
}
bootstrap();
