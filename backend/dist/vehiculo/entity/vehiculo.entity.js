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
exports.Vehiculo = void 0;
const turno_entity_1 = require("../../turno/entity/turno.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const titular_entity_1 = require("../../titular/entity/titular.entity");
const modelo_entity_1 = require("../../modelo/entity/modelo.entity");
let Vehiculo = class Vehiculo {
    'id';
    'patente';
    'turno';
    'modelo';
    'titular';
};
exports.Vehiculo = Vehiculo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Vehiculo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehiculo.prototype, "patente", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.vehiculos),
    __metadata("design:type", Array)
], Vehiculo.prototype, "turno", void 0);
__decorate([
    (0, typeorm_3.ManyToOne)(() => modelo_entity_1.Modelo, (modelo) => modelo.vehiculos),
    (0, typeorm_3.JoinColumn)({ name: 'modelo_id' }),
    __metadata("design:type", modelo_entity_1.Modelo)
], Vehiculo.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_3.ManyToOne)(() => titular_entity_1.Titular, (titular) => titular.vehiculos),
    (0, typeorm_3.JoinColumn)({ name: 'titular_id' }),
    __metadata("design:type", titular_entity_1.Titular)
], Vehiculo.prototype, "titular", void 0);
exports.Vehiculo = Vehiculo = __decorate([
    (0, typeorm_1.Entity)("Vehiculo")
], Vehiculo);
//# sourceMappingURL=vehiculo.entity.js.map