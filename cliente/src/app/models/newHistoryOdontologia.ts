import { Anamnesis } from "./anamnesis";
import { ExamenPeriodontal } from "./examen-periodontal";
import { Odontologia } from "./odontologia";
import { Paciente } from "./paciente";
import { Tejidos_blandos } from "./tejidos_blandos";
import { Tejidos_dentales } from "./tejidos_dentales";

export class NewHistoryOdontologia{
    paciente: Paciente;
    odontologia: Odontologia;
    anamnesis: Anamnesis;
    examenPeriodontal: ExamenPeriodontal;
    tejidosBlandos: Tejidos_blandos;
    tejidosDentales: Tejidos_dentales;
}