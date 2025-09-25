import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    console.log("🏠 ENDPOINT GET / CHAMADO");
    
    try {
      const response = {
        message: 'Caminho dos Ventos API',
        version: '1.0.0',
        status: 'running',
        timestamp: new Date().toISOString(),
        endpoints: {
          auth: '/api/auth',
          clients: '/api/clients',
          orders: '/api/orders',
          products: '/api/produtos',
          stock: '/api/stock',
          admin: '/api/admin',
          users: '/api/usuarios',
          health: '/api/health'
        },
        documentation: '/api/docs'
      };
      
      console.log("✅ Rota raiz respondida com sucesso!");
      return response;
    } catch (error) {
      console.log("💥 Erro na rota raiz:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  @Get('docs')
  getDocs() {
    console.log("📚 ENDPOINT GET /docs CHAMADO");
    
    try {
      const docs = {
        title: 'Caminho dos Ventos API Documentation',
        version: '1.0.0',
        description: 'API para gerenciamento de produtos esotéricos',
        baseUrl: 'http://localhost:3000/api',
        endpoints: {
          authentication: {
            'POST /auth/register': 'Registrar novo usuário',
            'POST /auth/login': 'Fazer login'
          },
          clients: {
            'GET /clients': 'Listar todos os clientes',
            'GET /clients/:id': 'Buscar cliente por ID'
          },
          orders: {
            'GET /orders': 'Listar todos os pedidos',
            'POST /orders': 'Criar novo pedido',
            'PATCH /orders/:id/status': 'Atualizar status do pedido'
          },
          products: {
            'GET /produtos': 'Listar todos os produtos',
            'POST /produtos': 'Criar novo produto',
            'GET /produtos/:id': 'Buscar produto por ID',
            'PATCH /produtos/:id': 'Atualizar produto',
            'DELETE /produtos/:id': 'Remover produto'
          },
          stock: {
            'GET /stock/items': 'Listar itens de estoque',
            'GET /stock/movements': 'Listar movimentações',
            'GET /stock/alerts': 'Listar alertas',
            'GET /stock/reports/overview': 'Relatório geral'
          },
          admin: {
            'GET /admin/clients': 'Listar clientes (admin)',
            'GET /admin/orders': 'Listar pedidos (admin)',
            'PATCH /admin/orders/:id/status': 'Atualizar status (admin)'
          },
          health: {
            'GET /health': 'Health check da API',
            'GET /health/status': 'Status da API'
          }
        },
        authentication: {
          type: 'Bearer Token (JWT)',
          header: 'Authorization: Bearer <token>'
        }
      };
      
      console.log("✅ Documentação retornada com sucesso!");
      return docs;
    } catch (error) {
      console.log("💥 Erro ao retornar documentação:", error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
}

