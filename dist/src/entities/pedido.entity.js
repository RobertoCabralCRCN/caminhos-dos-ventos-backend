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
exports.Pedido = exports.PedidoStatus = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./client.entity");
var PedidoStatus;
(function (PedidoStatus) {
    PedidoStatus["AGUARDANDO_PRODUCAO"] = "aguardando_producao";
    PedidoStatus["PRONTO"] = "pronto";
    PedidoStatus["ENTREGUE"] = "entregue";
})(PedidoStatus = exports.PedidoStatus || (exports.PedidoStatus = {}));
let Pedido = class Pedido {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Pedido.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Cliente, (cliente) => cliente.pedidos),
    __metadata("design:type", client_entity_1.Cliente)
], Pedido.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    __metadata("design:type", Array)
], Pedido.prototype, "itens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pedido.prototype, "dataCriacao", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PedidoStatus,
        default: PedidoStatus.AGUARDANDO_PRODUCAO,
    }),
    __metadata("design:type", String)
], Pedido.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "preco", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pedido.prototype, "taxaEntrega", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Pedido.prototype, "responsavel", void 0);
Pedido = __decorate([
    (0, typeorm_1.Entity)()
], Pedido);
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.entity.js.map