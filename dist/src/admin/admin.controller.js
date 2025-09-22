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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const update_order_status_dto_1 = require("../orders/dto/update-order-status.dto");
const assign_responsible_dto_1 = require("./dto/assign-responsible.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    findAllClients() {
        return this.adminService.findAllClients();
    }
    findClientById(id) {
        return this.adminService.findClientById(id);
    }
    findAllOrders() {
        return this.adminService.findAllOrders();
    }
    updateOrderStatus(id, updateOrderStatusDto) {
        return this.adminService.updateOrderStatus(id, updateOrderStatusDto);
    }
    assignResponsible(id, assignResponsibleDto) {
        return this.adminService.assignResponsible(id, assignResponsibleDto.responsibleName);
    }
};
__decorate([
    (0, common_1.Get)("clients"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllClients", null);
__decorate([
    (0, common_1.Get)("clients/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findClientById", null);
__decorate([
    (0, common_1.Get)("orders"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllOrders", null);
__decorate([
    (0, common_1.Patch)("orders/:id/status"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_status_dto_1.UpdateOrderStatusDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateOrderStatus", null);
__decorate([
    (0, common_1.Patch)("orders/:id/assign-responsible"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_responsible_dto_1.AssignResponsibleDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "assignResponsible", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map