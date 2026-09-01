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
exports.LocalidadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const localidad_entity_1 = require("./entity/localidad.entity");
let LocalidadService = class LocalidadService {
    localidadRepository;
    constructor(localidadRepository) {
        this.localidadRepository = localidadRepository;
    }
    async findAll() {
        return await this.localidadRepository.find();
    }
    async findOne(id) {
        const localidad = await this.localidadRepository.findOne({ where: { id } });
        if (!localidad) {
            throw new common_1.NotFoundException(`Localidad con id ${id} no encontrada`);
        }
        return localidad;
    }
    async create(createLocalidadDto) {
        const nuevaLocalidad = this.localidadRepository.create(createLocalidadDto);
        return await this.localidadRepository.save(nuevaLocalidad);
    }
    async update(id, updateLocalidadDto) {
        const localidad = await this.findOne(id);
        this.localidadRepository.merge(localidad, updateLocalidadDto);
        return await this.localidadRepository.save(localidad);
    }
    async remove(id) {
        const localidad = await this.findOne(id);
        await this.localidadRepository.remove(localidad);
        return { message: `Localidad con id ${id} eliminada correctamente` };
    }
};
exports.LocalidadService = LocalidadService;
exports.LocalidadService = LocalidadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(localidad_entity_1.Localidad)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalidadService);
//# sourceMappingURL=localidad.service.js.map