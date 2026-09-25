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
exports.Modelo = void 0;
const typeorm_1 = require("typeorm");
const vehiculo_entity_1 = require("../../vehiculo/entity/vehiculo.entity");
const marca_entity_1 = require("../../marca/entity/marca.entity");
const esquemaElectrico_entity_1 = require("../../esquemaElectrico/entity/esquemaElectrico.entity");
let Modelo = class Modelo {
    'id';
    'nombre';
    'marca';
    'vehiculos';
    'fallasHabituales';
    'esquemasElectricos';
};
exports.Modelo = Modelo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Modelo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Modelo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => marca_entity_1.Marca, (marca) => marca.modelos),
    (0, typeorm_1.JoinColumn)({ name: 'marca_id' }),
    __metadata("design:type", marca_entity_1.Marca)
], Modelo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehiculo_entity_1.Vehiculo, (vehiculo) => vehiculo.modelo),
    __metadata("design:type", Array)
], Modelo.prototype, "vehiculos", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Modelo.prototype, "fallasHabituales", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => esquemaElectrico_entity_1.EsquemaElectrico, (esquemaElectrico) => esquemaElectrico.modelo),
    __metadata("design:type", Array)
], Modelo.prototype, "esquemasElectricos", void 0);
exports.Modelo = Modelo = __decorate([
    (0, typeorm_1.Entity)("Modelo")
], Modelo);
//# sourceMappingURL=modelo.entity.js.map