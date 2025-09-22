"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("./clients.service");
const clients_controller_1 = require("./clients.controller");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../entities/client.entity");
const typeorm_client_repository_1 = require("./repositories/typeorm-client.repository");
const client_repository_constant_1 = require("./repositories/client.repository.constant");
let ClientsModule = class ClientsModule {
};
ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([client_entity_1.Cliente])],
        controllers: [clients_controller_1.ClientsController],
        providers: [
            clients_service_1.ClientsService,
            { provide: client_repository_constant_1.CLIENT_REPOSITORY, useClass: typeorm_client_repository_1.TypeOrmClientRepository },
        ],
        exports: [clients_service_1.ClientsService, client_repository_constant_1.CLIENT_REPOSITORY],
    })
], ClientsModule);
exports.ClientsModule = ClientsModule;
//# sourceMappingURL=clients.module.js.map