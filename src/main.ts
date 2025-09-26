import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: [
      'https://caminhodosventos.tk',
      'https://www.caminhodosventos.tk',
      'https://caminho-dos-ventos.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Aplicação rodando na porta ${port}`);
}
bootstrap();
