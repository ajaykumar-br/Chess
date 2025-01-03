"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveType = void 0;
const zod_1 = require("zod");
exports.moveType = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string()
});
