"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../clients/clients.service");
const orders_service_1 = require("../orders/orders.service");
let AdminService = class AdminService {
    constructor(clientsService, ordersService) {
        this.clientsService = clientsService;
        this.ordersService = ordersService;
    }
    async findAllClients() {
        // Assuming ClientsService has a findAll method
        // For MVP, if not implemented, we can add it later or retrieve directly from repository
        // For now, let's just return an empty array or throw an error if not implemented in ClientsService
        return this.clientsService.findAll(); // Assuming ClientsService has a findAll method
    }
    async findClientById(id) {
        // Assuming ClientsService has a findOneById method
        return this.clientsService.findOneById(id); // Assuming ClientsService has a findOneById method
    }
    async findAllOrders() {
        return this.ordersService.findAll();
    }
    async updateOrderStatus(orderId, updateOrderStatusDto) {
        return this.ordersService.updateStatus(orderId, updateOrderStatusDto);
    }
    async assignResponsible(orderId, responsibleName) {
        const order = await this.ordersService.findOneById(orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        order.responsavel = responsibleName;
        return this.ordersService.save(order);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        orders_service_1.OrdersService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map