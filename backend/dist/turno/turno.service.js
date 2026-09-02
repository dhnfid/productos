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
exports.TurnoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const turno_entity_1 = require("./entity/turno.entity");
let TurnoService = class TurnoService {
    turnoRepository;
    constructor(turnoRepository) {
        this.turnoRepository = turnoRepository;
    }
    async findAll() {
        return await this.turnoRepository.find({
            relations: {
                vehiculos: true,
                titular: true
            },
        });
    }
    async findOne(id) {
        const turno = await this.turnoRepository.findOne({
            where: { id },
            relations: {
                vehiculos: true,
                titular: true
            },
        });
        if (!turno) {
            throw new common_1.NotFoundException(`Turno con id ${id} no encontrado`);
        }
        return turno;
    }
    async create(createTurnoDto) {
        const { vehiculoId, titularId, ...datosTurno } = createTurnoDto;
        const nuevoTurno = this.turnoRepository.create({
            ...datosTurno,
            fecha: new Date(),
            vehiculos: { id: vehiculoId },
            titular: { id: titularId },
        });
        return await this.turnoRepository.save(nuevoTurno);
    }
    async update(id, updateTurnoDto) {
        const turno = await this.findOne(id);
        const { vehiculoId, titularId, ...datosActualizar } = updateTurnoDto;
        this.turnoRepository.merge(turno, datosActualizar);
        if (vehiculoId)
            turno.vehiculos = { id: vehiculoId };
        if (titularId)
            turno.titular = { id: titularId };
        return await this.turnoRepository.save(turno);
    }
    async remove(id) {
        const turno = await this.findOne(id);
        await this.turnoRepository.remove(turno);
        return { message: `Turno con id ${id} eliminado correctamente` };
    }
};
exports.TurnoService = TurnoService;
exports.TurnoService = TurnoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(turno_entity_1.Turno)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TurnoService);
//# sourceMappingURL=turno.service.js.map