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
exports.ModeloController = void 0;
const common_1 = require("@nestjs/common");
const modelo_service_1 = require("./modelo.service");
const create_modelo_dto_1 = require("./DTO/create-modelo.dto");
const update_modelo_dto_1 = require("./DTO/update-modelo.dto");
let ModeloController = class ModeloController {
    modeloService;
    constructor(modeloService) {
        this.modeloService = modeloService;
    }
    findAll() {
        return this.modeloService.findAll();
    }
    findOne(id) {
        return this.modeloService.findOne(id);
    }
    create(createModeloDto) {
        return this.modeloService.create(createModeloDto);
    }
    update(id, updateModeloDto) {
        return this.modeloService.update(id, updateModeloDto);
    }
    remove(id) {
        return this.modeloService.remove(id);
    }
};
exports.ModeloController = ModeloController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ModeloController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModeloController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_modelo_dto_1.CreateModeloDto]),
    __metadata("design:returntype", Promise)
], ModeloController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_modelo_dto_1.UpdateModeloDto]),
    __metadata("design:returntype", Promise)
], ModeloController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModeloController.prototype, "remove", null);
exports.ModeloController = ModeloController = __decorate([
    (0, common_1.Controller)('modelo'),
    __metadata("design:paramtypes", [modelo_service_1.ModeloService])
], ModeloController);
//# sourceMappingURL=modelo.controller.js.map