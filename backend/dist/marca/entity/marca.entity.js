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
exports.Marca = void 0;
const typeorm_1 = require("typeorm");
const modelo_entity_1 = require("../../modelo/entity/modelo.entity");
let Marca = class Marca {
    'id';
    'nombre';
    'modelos';
};
exports.Marca = Marca;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Marca.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Marca.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => modelo_entity_1.Modelo, (modelo) => modelo.marca),
    __metadata("design:type", Array)
], Marca.prototype, "modelos", void 0);
exports.Marca = Marca = __decorate([
    (0, typeorm_1.Entity)("Marca")
], Marca);
//# sourceMappingURL=marca.entity.js.map