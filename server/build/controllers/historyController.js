"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const historyServices_1 = __importDefault(require("../services/historyServices"));
class historyController {
    constructor() {
        this.historyService = new historyServices_1.default();
        // crea una nueva historia clinica
        this.newHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { paciente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = req.body;
                yield this.historyService.newHistory(paciente);
                yield this.historyService.insertNewOdontologia(odontologia);
                yield this.historyService.insertNewAnamnesis(anamnesis);
                yield this.historyService.insertNewExamenPeriodontal(examenPeriodontal);
                yield this.historyService.insertNewExamenTejidosBlnados(tejidosBlandos);
                yield this.historyService.insertNewExamenTejidosDentales(tejidosDentales);
                res.status(200).json({
                    success: true,
                    message: "insercion correcta",
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        // Muestra solo el numero de historia clinica
        this.findHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const [{ nombrePaciente, numOdontologia, numOrtodoncia }] = yield this.historyService.findHistory(id);
                res.status(200).json({
                    success: true,
                    numOdontologia: numOdontologia,
                    numOrtodoncia: numOrtodoncia,
                    nombrePaciente: nombrePaciente,
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        // Muestra toda la historia clinica de un paciente por id
        this.getHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { tabla } = req.params;
                const { nombreCampo } = req.params;
                const data = yield this.historyService.getHistory(id, tabla, nombreCampo);
                res.status(200).json({
                    success: true,
                    data: data,
                });
            }
            catch (err) {
                console.log(err);
                // deberia ir 400
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = historyController;
