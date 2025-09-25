import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    console.log("🏥 ENDPOINT GET /health CHAMADO");
    
    try {
      const health = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        services: {
          database: 'connected',
          api: 'running'
        }
      };
      
      console.log("✅ Health check realizado com sucesso!");
      return health;
    } catch (error) {
      console.log("💥 Erro no health check:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get('status')
  status() {
    console.log("📊 ENDPOINT GET /health/status CHAMADO");
    
    try {
      const status = {
        status: 'healthy',
        message: 'API is running properly',
        timestamp: new Date().toISOString()
      };
      
      console.log("✅ Status check realizado com sucesso!");
      return status;
    } catch (error) {
      console.log("💥 Erro no status check:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}

