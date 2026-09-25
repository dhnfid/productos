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
exports.EsquemaElectrico = void 0;
const typeorm_1 = require("typeorm");
const modelo_entity_1 = require("../../modelo/entity/modelo.entity");
let EsquemaElectrico = class EsquemaElectrico {
    'id';
    'urlArchivo';
    'modelo';
};
exports.EsquemaElectrico = EsquemaElectrico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], EsquemaElectrico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-json', { nullable: true }),
    __metadata("design:type", Array)
], EsquemaElectrico.prototype, "urlArchivo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => modelo_entity_1.Modelo, (modelo) => modelo.esquemasElectricos),
    (0, typeorm_1.JoinColumn)({ name: 'modelo_id' }),
    __metadata("design:type", modelo_entity_1.Modelo)
], EsquemaElectrico.prototype, "modelo", void 0);
exports.EsquemaElectrico = EsquemaElectrico = __decorate([
    (0, typeorm_1.Entity)("esquemaElectrico")
], EsquemaElectrico);
//# sourceMappingURL=esquemaElectrico.entity.js.map