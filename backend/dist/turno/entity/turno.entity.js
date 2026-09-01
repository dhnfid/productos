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
exports.Turno = void 0;
const vehiculo_entity_1 = require("../../vehiculo/entity/vehiculo.entity");
const typeorm_1 = require("typeorm");
const titular_entity_1 = require("../../titular/entity/titular.entity");
let Turno = class Turno {
    'id';
    'fecha';
    'km';
    'vehiculos';
    'titular';
    'descripcion';
    'precio';
};
exports.Turno = Turno;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Turno.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Turno.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turno.prototype, "km", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vehiculo_entity_1.Vehiculo, (vehiculo) => vehiculo.turno),
    (0, typeorm_1.JoinColumn)({ name: 'vehiculo_id' }),
    __metadata("design:type", vehiculo_entity_1.Vehiculo)
], Turno.prototype, "vehiculos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => titular_entity_1.Titular, (titular) => titular.turnos),
    (0, typeorm_1.JoinColumn)({ name: 'titular_id' }),
    __metadata("design:type", titular_entity_1.Titular)
], Turno.prototype, "titular", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Turno.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Turno.prototype, "precio", void 0);
exports.Turno = Turno = __decorate([
    (0, typeorm_1.Entity)("Turno")
], Turno);
//# sourceMappingURL=turno.entity.js.map