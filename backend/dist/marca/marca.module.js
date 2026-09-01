"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const marca_entity_1 = require("./entity/marca.entity");
const marca_service_1 = require("./marca.service");
const marca_controller_1 = require("./marca.controller");
let MarcaModule = class MarcaModule {
};
exports.MarcaModule = MarcaModule;
exports.MarcaModule = MarcaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([marca_entity_1.Marca])],
        controllers: [marca_controller_1.MarcaController],
        providers: [marca_service_1.MarcaService],
        exports: [marca_service_1.MarcaService, typeorm_1.TypeOrmModule],
    })
], MarcaModule);
//# sourceMappingURL=marca.module.js.map