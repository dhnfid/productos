"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitularModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const titular_entity_1 = require("./entity/titular.entity");
const titular_service_1 = require("./titular.service");
const titular_controller_1 = require("./titular.controller");
let TitularModule = class TitularModule {
};
exports.TitularModule = TitularModule;
exports.TitularModule = TitularModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([titular_entity_1.Titular])],
        controllers: [titular_controller_1.TitularController],
        providers: [titular_service_1.TitularService],
        exports: [titular_service_1.TitularService, typeorm_1.TypeOrmModule],
    })
], TitularModule);
//# sourceMappingURL=titular.module.js.map