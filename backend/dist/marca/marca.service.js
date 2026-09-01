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
exports.MarcaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const marca_entity_1 = require("./entity/marca.entity");
let MarcaService = class MarcaService {
    marcaRepository;
    constructor(marcaRepository) {
        this.marcaRepository = marcaRepository;
    }
    async findAll() {
        return await this.marcaRepository.find();
    }
    async findOne(id) {
        const marca = await this.marcaRepository.findOne({ where: { id } });
        if (!marca) {
            throw new common_1.NotFoundException(`Marca con id ${id} no encontrada`);
        }
        return marca;
    }
    async create(createMarcaDto) {
        const nuevaMarca = this.marcaRepository.create(createMarcaDto);
        return await this.marcaRepository.save(nuevaMarca);
    }
    async update(id, updateMarcaDto) {
        const marca = await this.findOne(id);
        this.marcaRepository.merge(marca, updateMarcaDto);
        return await this.marcaRepository.save(marca);
    }
    async remove(id) {
        const marca = await this.findOne(id);
        await this.marcaRepository.remove(marca);
        return { message: `Marca con id ${id} eliminada correctamente` };
    }
};
exports.MarcaService = MarcaService;
exports.MarcaService = MarcaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(marca_entity_1.Marca)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MarcaService);
//# sourceMappingURL=marca.service.js.map