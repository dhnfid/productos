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
exports.EsquemaElectricoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const esquemaElectrico_entity_1 = require("./entity/esquemaElectrico.entity");
let EsquemaElectricoService = class EsquemaElectricoService {
    esquemaElectricoRepository;
    constructor(esquemaElectricoRepository) {
        this.esquemaElectricoRepository = esquemaElectricoRepository;
    }
    async findAll() {
        return await this.esquemaElectricoRepository.find({
            relations: {
                modelo: { marca: true },
            },
        });
    }
    async findOne(id) {
        const esquemaElectrico = await this.esquemaElectricoRepository.findOne({
            where: { id },
            relations: {
                modelo: { marca: true },
            },
        });
        if (!esquemaElectrico) {
            throw new common_1.NotFoundException(`Esquema Eléctrico con id ${id} no encontrado`);
        }
        return esquemaElectrico;
    }
    async create(createEsquemaElectricoDto, files) {
        const { modeloId, ...datosEsquemaElectrico } = createEsquemaElectricoDto;
        const nuevasRutas = files && files.length > 0
            ? files.map(file => `uploads/esquemas/${file.filename}`)
            : [];
        const urlArchivo = [
            ...(datosEsquemaElectrico.urlArchivo || []),
            ...nuevasRutas
        ];
        const nuevoEsquemaElectrico = this.esquemaElectricoRepository.create({
            ...datosEsquemaElectrico,
            urlArchivo,
            modelo: { id: modeloId },
        });
        return await this.esquemaElectricoRepository.save(nuevoEsquemaElectrico);
    }
    async update(id, updateEsquemaElectricoDto, files) {
        const esquemaElectrico = await this.findOne(id);
        const { modeloId, ...datosActualizar } = updateEsquemaElectricoDto;
        let urlArchivo = esquemaElectrico.urlArchivo || [];
        if (files && files.length > 0) {
            const nuevasRutas = files.map(file => `uploads/esquemas/${file.filename}`);
            urlArchivo = [...urlArchivo, ...nuevasRutas];
        }
        this.esquemaElectricoRepository.merge(esquemaElectrico, {
            ...datosActualizar,
            urlArchivo,
        });
        if (modeloId)
            esquemaElectrico.modelo = { id: modeloId };
        return await this.esquemaElectricoRepository.save(esquemaElectrico);
    }
    async remove(id) {
        const esquemaElectrico = await this.findOne(id);
        await this.esquemaElectricoRepository.remove(esquemaElectrico);
        return { message: `Esquema Eléctrico con id ${id} eliminado correctamente` };
    }
};
exports.EsquemaElectricoService = EsquemaElectricoService;
exports.EsquemaElectricoService = EsquemaElectricoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(esquemaElectrico_entity_1.EsquemaElectrico)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EsquemaElectricoService);
//# sourceMappingURL=esquemaElectrico.service.js.map