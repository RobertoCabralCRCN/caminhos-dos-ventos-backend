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
exports.TypeOrmClientRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("../../entities/client.entity");
let TypeOrmClientRepository = class TypeOrmClientRepository {
    constructor(clientsRepository) {
        this.clientsRepository = clientsRepository;
    }
    async save(client) {
        return this.clientsRepository.save(client);
    }
    async findOneByEmail(email) {
        return this.clientsRepository.findOne({ where: { email } });
    }
    async findOneById(id) {
        return this.clientsRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.clientsRepository.find();
    }
    async create(createClientDto) {
        const client = this.clientsRepository.create(createClientDto);
        return this.clientsRepository.save(client);
    }
};
TypeOrmClientRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeOrmClientRepository);
exports.TypeOrmClientRepository = TypeOrmClientRepository;
//# sourceMappingURL=typeorm-client.repository.js.map