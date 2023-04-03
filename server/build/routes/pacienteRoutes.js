"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteController_1 = __importDefault(require("../controllers/pacienteController"));
class PacienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.usuarioControler = new pacienteController_1.default();
        this.config();
    }
    config() {
        this.router.get('/paciente', this.usuarioControler.getusuario);
        this.router.get('/countpaciente/:id', this.usuarioControler.countusuario);
    }
}
exports.default = PacienteRoutes;
