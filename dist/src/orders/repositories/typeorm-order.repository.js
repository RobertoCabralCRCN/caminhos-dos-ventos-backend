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
exports.TypeOrmOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("../../entities/pedido.entity");
const clients_service_1 = require("../../clients/clients.service"); // Import ClientsService
let TypeOrmOrderRepository = class TypeOrmOrderRepository {
    constructor(ordersRepository, clientsService // Inject ClientsService here
    ) {
        this.ordersRepository = ordersRepository;
        this.clientsService = clientsService;
    }
    async save(pedido) {
        return this.ordersRepository.save(pedido);
    }
    async findOneById(id) {
        return this.ordersRepository.findOne({
            where: { id },
            relations: ["cliente"],
        });
    }
    async findAll() {
        return this.ordersRepository.find({ relations: ["cliente"] });
    }
    async create(createOrderDto, clienteId) {
        const client = await this.clientsService.findOneById(clienteId);
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${clienteId} not found`);
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
        const order = this.ordersRepository.create(Object.assign(Object.assign({}, createOrderDto), { cliente: client, preco: totalPrice, taxaEntrega: deliveryFee, status: pedido_entity_1.PedidoStatus.AGUARDANDO_PRODUCAO }));
        return this.ordersRepository.save(order);
    }
};
TypeOrmOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        clients_service_1.ClientsService // Inject ClientsService here
    ])
], TypeOrmOrderRepository);
exports.TypeOrmOrderRepository = TypeOrmOrderRepository;
//# sourceMappingURL=typeorm-order.repository.js.map