"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class RecordService {
    findRecords() {
        return new Promise((resolve, reject) => {
            database_1.default.query('SELECT * FROM registros', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    findRecordsID(id, consulta) {
        return new Promise((resolve, reject) => {
            database_1.default.query('SELECT * FROM registros WHERE paciente_id = ? and consulta = ?', [
                id,
                consulta
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
exports.default = RecordService;
