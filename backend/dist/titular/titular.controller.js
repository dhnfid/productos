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
exports.TitularController = void 0;
const common_1 = require("@nestjs/common");
const titular_service_1 = require("./titular.service");
const create_titular_dto_1 = require("./DTO/create-titular.dto");
const update_titular_dto_1 = require("./DTO/update-titular.dto");
let TitularController = class TitularController {
    titularService;
    constructor(titularService) {
        this.titularService = titularService;
    }
    findAll() {
        return this.titularService.findAll();
    }
    findOne(id) {
        return this.titularService.findOne(id);
    }
    create(createTitularDto) {
        return this.titularService.create(createTitularDto);
    }
    update(id, updateTitularDto) {
        return this.titularService.update(id, updateTitularDto);
    }
    remove(id) {
        return this.titularService.remove(id);
    }
};
exports.TitularController = TitularController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TitularController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TitularController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_titular_dto_1.CreateTitularDto]),
    __metadata("design:returntype", Promise)
], TitularController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_titular_dto_1.UpdateTitularDto]),
    __metadata("design:returntype", Promise)
], TitularController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TitularController.prototype, "remove", null);
exports.TitularController = TitularController = __decorate([
    (0, common_1.Controller)('titular'),
    __metadata("design:paramtypes", [titular_service_1.TitularService])
], TitularController);
//# sourceMappingURL=titular.controller.js.map