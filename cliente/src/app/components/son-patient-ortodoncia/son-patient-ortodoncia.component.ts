import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Anamnesis } from 'src/app/models/anamnesis';
import { Ortodoncia } from 'src/app/models/ortodoncia';
import { Paciente } from 'src/app/models/paciente';
import { HistoryService } from 'src/app/services/history.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-son-patient-ortodoncia',
  templateUrl: './son-patient-ortodoncia.component.html',
  styleUrls: ['./son-patient-ortodoncia.component.css']
})
export class SonPatientOrtodonciaComponent {


  @Output() idPaciente = new EventEmitter<string>();

  @Input() eventSubject: Subject<boolean>;
  subscription: Subscription;

  public validDoc: boolean = true;

    paciente = new Paciente()

  id: number;


  edad: string;

  public anamnesis: Anamnesis;
  public Paciente: Paciente;
  public ortodoncia: Ortodoncia;

  @Output() informacionPaciente = new EventEmitter<{ nombres: string, tipoDocumento: string, numeroDocumento: string }>();

  constructor(private pacienteService: PacienteService, private historyService: HistoryService) {
    this.anamnesis = new Anamnesis();
    this.ortodoncia = new Ortodoncia();
    this.paciente = new Paciente();

  }


  ngOnInit(): void {

 const myButton = document.getElementById("myButton") as HTMLButtonElement;

    myButton.style.display = 'none';

    const id: any = localStorage.getItem('paciente');
    this.id = id;
    //localStorage.removeItem('paciente');




    this.pacienteService.getPaciente(id).subscribe((res: any) => {

      const Res_paciente = res.data[0]; // Obtener el objeto con los datos del paciente

      this.paciente.id = Res_paciente.paciente_id;
      this.paciente.tipoID = Res_paciente.tipo_documento;
      this.paciente.nombre = Res_paciente.nombre;
      this.paciente.apellido = Res_paciente.apellido;
      this.paciente.fechaNacimiento = Res_paciente.fecha_nacimiento;
      this.paciente.fechaNacimiento = this.paciente.fechaNacimiento.split('T')[0];
      this.paciente.genero = Res_paciente.sexo;
      this.paciente.estadoCivil = Res_paciente.estado_civil;
      this.paciente.ciudadNacimiento = Res_paciente.ciudad_nacimiento;
      this.paciente.ocupacion = Res_paciente.ocupacion;
      this.paciente.servicioSalud = Res_paciente.servicio_salud;
      this.paciente.ciudadResidencia = Res_paciente.ciudad_residencia;
      this.paciente.direccion = Res_paciente.direccion;
      this.paciente.celular = Res_paciente.numero_celular;



      this.edad = this.calcularEdad(Res_paciente.fecha_nacimiento).toString();


      this.idPaciente.emit(this.paciente.id.toString());

      this.informacionPaciente.emit({ nombres: this.paciente.nombre + " " + this.paciente.apellido, tipoDocumento: this.paciente.tipoID, numeroDocumento: this.paciente.id.toString() });


    });
    this.consultaAnamnesis();
    this.consultaOrtodoncia();

    if (this.eventSubject) {
      this.subscription = this.eventSubject.asObservable().subscribe(
        res => this.editar()
      )
    }

  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


  consultaAnamnesis() {
    this.historyService.getHistory(this.id, 'anamnesis', 'anamnesis_id').subscribe((res: any) => {


      this.anamnesis.anamnesis_id = res.data[0].anamnesis_id
      this.anamnesis.hipertencion = res.data[0].hipertension === '1' ? true : false;
      this.anamnesis.enfe_respiratorias = res.data[0].enfermedades_respiratorias === '1' ? true : false;
      this.anamnesis.cardiopatias = res.data[0].cardiopatias === '1' ? true : false;
      this.anamnesis.sistema_digestivo = res.data[0].sistema_digestivo === '1' ? true : false;
      this.anamnesis.fiebre_reumatica = res.data[0].fiebre_reumatica === '1' ? true : false;
      this.anamnesis.hepatitis = res.data[0].hepatitis === '1' ? true : false;
      this.anamnesis.enfer_renales = res.data[0].enfermedades_renales === '1' ? true : false;
      this.anamnesis.enfer_gastrointestinales = res.data[0].enfermedades_gastrointestinales === '1' ? true : false;
      this.anamnesis.quirurgico = res.data[0].quirurgico === '1' ? true : false;
      this.anamnesis.traumatico = res.data[0].traumatico === '1' ? true : false;
      this.anamnesis.tratamiento_medico = res.data[0].tratamiento_medico === '1' ? true : false;
      this.anamnesis.toma_medicamento = res.data[0].toma_medicamentos === '1' ? true : false;
      this.anamnesis.alergia = res.data[0].alergias === '1' ? true : false;
      this.anamnesis.embarazo = res.data[0].embarazo === '1' ? true : false;
      this.anamnesis.diabetes = res.data[0].diabetes === '1' ? true : false;
      this.anamnesis.neoplasias = res.data[0].neoplasias === '1' ? true : false;
      this.anamnesis.enfer_hemorrogicas = res.data[0].enfermedad_hemorrogica === '1' ? true : false;
      this.anamnesis.nf_neurologicas = res.data[0].nf_neurologicas === '1' ? true : false;
      this.anamnesis.grupo_sangineo = res.data[0].grupo_sanguineo
      this.anamnesis.rh = res.data[0].rh
      this.anamnesis.observaciones = res.data[0].observaciones




    });

  }

  consultaOrtodoncia() {
    this.historyService.getHistory(this.id, 'historiales_ortodoncia', 'ortodoncia_id').subscribe((res: any) => {


      this.ortodoncia.ortodoncia_id = res.data[0].ortodoncia_id;
      this.ortodoncia.linea_media = res.data[0].linea_media === '1' ? true : false;
      this.ortodoncia.overjet = res.data[0].overjet === '1' ? true : false;
      this.ortodoncia.overbite = res.data[0].overbite === '1' ? true : false;
      this.ortodoncia.perdida_dientes = res.data[0].perdida_dientes === '1' ? true : false;
      this.ortodoncia.migraciones = res.data[0].migraciones === '1' ? true : false;
      this.ortodoncia.asimentria_facial = res.data[0].asimetria_facial === '1' ? true : false;
      this.ortodoncia.apinamiento_superior = res.data[0].apinamiento_superior === '1' ? true : false;
      this.ortodoncia.apinamiento_inferior = res.data[0].apinamiento_inferior === '1' ? true : false;
      this.ortodoncia.perfil = res.data[0].perfil === '1' ? true : false;
      this.ortodoncia.habitos = res.data[0].habitos === '1' ? true : false;
      this.ortodoncia.relacion_canina_derecha = res.data[0].relacion_canina_derecha === '1' ? true : false;
      this.ortodoncia.relacion_canina_izquierda = res.data[0].relacion_canina_izquierda === '1' ? true : false;
      this.ortodoncia.relacion_molar_derecha = res.data[0].relacion_molar_derecha === '1' ? true : false;
      this.ortodoncia.relacion_molar_izquierda = res.data[0].relacion_molar_izquierda === '1' ? true : false;
      this.ortodoncia.mal_posicion_dental_superior = res.data[0].mal_posicion_dental_superior === '1' ? true : false;
      this.ortodoncia.mal_posicion_dental_inferior = res.data[0].mal_posicion_dental_inferior === '1' ? true : false;
      this.ortodoncia.mordida_cruzada = res.data[0].mordida_cruzada === '1' ? true : false;
      this.ortodoncia.otros = res.data[0].otros;
      this.ortodoncia.pronostico = res.data[0].pronostico;
      this.ortodoncia.plan_de_tratamiento = res.data[0].plan_de_tratamiento;
      this.ortodoncia.paciente_id = res.data[0].paciente_id;
      this.ortodoncia.anamnesis_id = res.data[0].anamnesis_id;




    });
  }




  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    const edadEnMilisegundos = fechaActual.getTime() - fechaNac.getTime();
    const edadEnAnios = edadEnMilisegundos / 31536000000; // cantidad de milisegundos en un año
    return Math.floor(edadEnAnios);
  }

  editar() {
    const myButton = document.getElementById("myButton") as HTMLButtonElement;
    myButton.click();

  }

  validarNumeroDocumento(id: any) {

    this.pacienteService.validar(id).subscribe((res: any) => {

      const { numUser } = res;


      this.validDoc = numUser == 0

      //res.numUser

    })
  }

}
