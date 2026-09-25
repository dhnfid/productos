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
exports.TitularService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const titular_entity_1 = require("./entity/titular.entity");
let TitularService = class TitularService {
    titularRepository;
    constructor(titularRepository) {
        this.titularRepository = titularRepository;
    }
    async findAll() {
        return await this.titularRepository.find({
            relations: { localidad: { provincia: true } },
        });
    }
    async findOne(id) {
        const titular = await this.titularRepository.findOne({
            where: { id },
            relations: {
                localidad: { provincia: true },
            },
        });
        if (!titular) {
            throw new common_1.NotFoundException(`Titular con id ${id} no encontrado`);
        }
        return titular;
    }
    async create(createTitularDto) {
        const { localidadId, ...datosTitular } = createTitularDto;
        const nuevoTitular = this.titularRepository.create({
            ...datosTitular,
            localidad: { id: localidadId },
        });
        return await this.titularRepository.save(nuevoTitular);
    }
    async update(id, updateTitularDto) {
        const titular = await this.findOne(id);
        const { localidadId, ...datosActualizar } = updateTitularDto;
        this.titularRepository.merge(titular, datosActualizar);
        if (localidadId)
            titular.localidad = { id: localidadId };
        return await this.titularRepository.save(titular);
    }
    async remove(id) {
        const titular = await this.findOne(id);
        await this.titularRepository.remove(titular);
        return { message: `Titular con id ${id} eliminado correctamente` };
    }
};
exports.TitularService = TitularService;
exports.TitularService = TitularService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(titular_entity_1.Titular)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TitularService);
//# sourceMappingURL=titular.service.js.map