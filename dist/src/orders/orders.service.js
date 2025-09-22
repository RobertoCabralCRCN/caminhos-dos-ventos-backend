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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const pedido_entity_1 = require("../entities/pedido.entity");
const clients_service_1 = require("../clients/clients.service");
const order_repository_constant_1 = require("./repositories/order.repository.constant");
let OrdersService = class OrdersService {
    constructor(ordersRepository, clientsService) {
        this.ordersRepository = ordersRepository;
        this.clientsService = clientsService;
    }
    async create(createOrderDto) {
        const client = await this.clientsService.findOneById(createOrderDto.clienteId.toString());
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${createOrderDto.clienteId} not found`);
        }
        let totalPrice = 0;
        for (const item of createOrderDto.itens) {
            totalPrice += item.quantidade * 10; // Placeholder price
        }
        let deliveryFee = 5; // Default fee
        if (createOrderDto.cidade.toLowerCase() === "sao paulo") {
            deliveryFee = 15;
        }
        else if (createOrderDto.cidade.toLowerCase() === "rio de janeiro") {
            deliveryFee = 12;
        }
        const newOrder = new pedido_entity_1.Pedido();
        newOrder.cliente = client;
        newOrder.itens = createOrderDto.itens;
        newOrder.preco = totalPrice;
        newOrder.taxaEntrega = deliveryFee;
        newOrder.status = pedido_entity_1.PedidoStatus.AGUARDANDO_PRODUCAO;
        return this.ordersRepository.save(newOrder);
    }
    async findAll() {
        return this.ordersRepository.findAll();
    }
    async findOneById(id) {
        return this.ordersRepository.findOneById(id);
    }
    async save(pedido) {
        return this.ordersRepository.save(pedido);
    }
    async updateStatus(pedidoId, updateOrderStatusDto) {
        const order = await this.ordersRepository.findOneById(pedidoId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${pedidoId} not found`);
        }
        order.status = updateOrderStatusDto.status;
        return this.ordersRepository.save(order);
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(order_repository_constant_1.ORDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, clients_service_1.ClientsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map