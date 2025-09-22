"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const client_entity_1 = require("./entities/client.entity");
const pedido_entity_1 = require("./entities/pedido.entity");
const clients_module_1 = require("./clients/clients.module");
const auth_module_1 = require("./auth/auth.module");
const orders_module_1 = require("./orders/orders.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || "5432", 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [client_entity_1.Cliente, pedido_entity_1.Pedido],
                synchronize: true, // Should be false in production
            }),
            clients_module_1.ClientsModule,
            auth_module_1.AuthModule,
            orders_module_1.OrdersModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map