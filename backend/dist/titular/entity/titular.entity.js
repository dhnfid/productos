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
exports.Titular = void 0;
const typeorm_1 = require("typeorm");
const localidad_entity_1 = require("../../localidad/entity/localidad.entity");
const provincia_entity_1 = require("../../provincia/entity/provincia.entity");
const turno_entity_1 = require("../../turno/entity/turno.entity");
const vehiculo_entity_1 = require("../../vehiculo/entity/vehiculo.entity");
let Titular = class Titular {
    'id';
    'nombre';
    'telefono';
    'numDocumento';
    'localidad';
    'provincia';
    'turnos';
    'vehiculos';
};
exports.Titular = Titular;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Titular.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Titular.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Titular.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Titular.prototype, "numDocumento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => localidad_entity_1.Localidad, (localidad) => localidad.titulares),
    (0, typeorm_1.JoinColumn)({ name: 'localidad_id' }),
    __metadata("design:type", localidad_entity_1.Localidad)
], Titular.prototype, "localidad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provincia_entity_1.Provincia, (provincia) => provincia.titulares),
    (0, typeorm_1.JoinColumn)({ name: 'provincia_id' }),
    __metadata("design:type", provincia_entity_1.Provincia)
], Titular.prototype, "provincia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => turno_entity_1.Turno, (turno) => turno.titular),
    __metadata("design:type", Array)
], Titular.prototype, "turnos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehiculo_entity_1.Vehiculo, (vehiculo) => vehiculo.titular),
    __metadata("design:type", Array)
], Titular.prototype, "vehiculos", void 0);
exports.Titular = Titular = __decorate([
    (0, typeorm_1.Entity)("Titular")
], Titular);
//# sourceMappingURL=titular.entity.js.map