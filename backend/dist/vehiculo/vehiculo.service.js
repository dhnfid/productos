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
exports.VehiculoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehiculo_entity_1 = require("./entity/vehiculo.entity");
let VehiculoService = class VehiculoService {
    vehiculoRepository;
    constructor(vehiculoRepository) {
        this.vehiculoRepository = vehiculoRepository;
    }
    async findAll() {
        return await this.vehiculoRepository.find({
            relations: { modelo: true, titular: true },
        });
    }
    async findOne(id) {
        const vehiculo = await this.vehiculoRepository.findOne({
            where: { id },
            relations: { modelo: true, titular: true, turno: true },
        });
        if (!vehiculo) {
            throw new common_1.NotFoundException(`Vehículo con id ${id} no encontrado`);
        }
        return vehiculo;
    }
    async create(createVehiculoDto) {
        const { modeloId, titularId, ...datosVehiculo } = createVehiculoDto;
        const nuevoVehiculo = this.vehiculoRepository.create({
            ...datosVehiculo,
            modelo: { id: modeloId },
            titular: { id: titularId },
        });
        return await this.vehiculoRepository.save(nuevoVehiculo);
    }
    async update(id, updateVehiculoDto) {
        const vehiculo = await this.findOne(id);
        const { modeloId, titularId, ...datosActualizar } = updateVehiculoDto;
        this.vehiculoRepository.merge(vehiculo, datosActualizar);
        if (modeloId)
            vehiculo.modelo = { id: modeloId };
        if (titularId)
            vehiculo.titular = { id: titularId };
        return await this.vehiculoRepository.save(vehiculo);
    }
    async remove(id) {
        const vehiculo = await this.findOne(id);
        await this.vehiculoRepository.remove(vehiculo);
        return { message: `Vehículo con id ${id} eliminado correctamente` };
    }
};
exports.VehiculoService = VehiculoService;
exports.VehiculoService = VehiculoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculo_entity_1.Vehiculo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehiculoService);
//# sourceMappingURL=vehiculo.service.js.map