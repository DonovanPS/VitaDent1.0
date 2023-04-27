
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PacienteService } from 'src/app/services/paciente.service';
import { RecordService } from 'src/app/services/record.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})




export class PatientComponent {


  tipoDocumento: number;
  history: string;
  records: any[] = [];
  showDivRadiografias: boolean = false;
  showDivTable: boolean = false;



  showSonPatientOdontologia = false;
  showSonPatientOrtodoncia = false

  nombres: string;
  tipoDoc: string;
  numeroDocumento: string;

  idAux: number;


  constructor(
    private recordService: RecordService,
    private pacienteService: PacienteService,

    ) { }

  eventSubject: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {

    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.style.display = 'none';


    // estrae la variable del local Storage y la compara con el valor de la variable
    const history = localStorage.getItem('historial');

    this.history = history !== null ? history : '';

    if (history === '1. Historial Odontológico') {
      this.toggleSonPatientOdontologia()
      this.history = 'historial odontológico'

    } else if (history === '2. Historial Ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.history = 'historial ortodoncia'
    }



  }

  recibirInformacionPaciente(informacion: { nombres: string, tipoDocumento: string, numeroDocumento: string }) {

    this.nombres = informacion.nombres;
    this.tipoDoc = informacion.tipoDocumento;
    this.numeroDocumento = informacion.numeroDocumento;
    this.idAux = parseInt(this.numeroDocumento);

  }



  idPacienteEvento(event: string) {
    this.tipoDocumento = parseInt(event);

    if (this.history === 'historial odontológico') {
      this.consultaOdontologia();
      this.toggleSonPatientOdontologia();
    } else if (this.history === 'historial ortodoncia') {
      this.toggleSonPatientOrtodoncia()
      this.consultaOrtodoncia();
    }


  }

  toggleSonPatientOdontologia() {
    this.showSonPatientOdontologia = true

  }

  toggleSonPatientOrtodoncia() {
    this.showSonPatientOrtodoncia = true
  }

  consultaOdontologia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Odontologia').subscribe((res: any) => {


      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {


        this.records = [...this.records, ...res.records];

      });


    });

  }


  consultaOrtodoncia() {

    this.recordService.findRecordsID(this.tipoDocumento, 'Ortodoncia').subscribe((res: any) => {

      this.records = res.records;

      this.recordService.findRecordsID(this.tipoDocumento, 'Urgencia').subscribe((res: any) => {



        this.records = [...this.records, ...res.records];

      });


    });

  }


  showDiv(div: string) {

    if (div === 'R') {
      this.showDivRadiografias = true;
      this.showDivTable = false;
    } else {
      this.showDivRadiografias = false;
      this.showDivTable = true;
    }


  }

  editar() {
    this.eventSubject.next(true);
  }

  eliminar() {
    console.log('eliminar');
    console.log(this.idAux);
    console.log(this.numeroDocumento);

    console.log(this.history);

    this.pacienteService.deletePaciente(this.idAux).subscribe((res: any) => {

    console.log(res.message);

    if(res.message === 'Paciente eliminado'){


      this.cambiarPagina();
    }
    });

  }

  cambiarPagina() {
    localStorage.setItem('eliminar', 'true');
    const myButton2 = document.getElementById("myButton2") as HTMLButtonElement;
    myButton2.click();
  }



}
