"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTitularDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_titular_dto_1 = require("./create-titular.dto");
class UpdateTitularDto extends (0, mapped_types_1.PartialType)(create_titular_dto_1.CreateTitularDto) {
}
exports.UpdateTitularDto = UpdateTitularDto;
//# sourceMappingURL=update-titular.dto.js.map