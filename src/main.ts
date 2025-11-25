import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// This is the main entry point of the application.
async function bootstrap() {
  // Create a new NestJS application instance.
  const app = await NestFactory.create(AppModule);

  // The app will listen for incoming requests on port 3000.
  await app.listen(3000);
}

// Start the application.
bootstrap();
