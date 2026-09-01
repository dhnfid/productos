"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateModeloDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_modelo_dto_1 = require("./create-modelo.dto");
class UpdateModeloDto extends (0, mapped_types_1.PartialType)(create_modelo_dto_1.CreateModeloDto) {
}
exports.UpdateModeloDto = UpdateModeloDto;
//# sourceMappingURL=update-modelo.dto.js.map