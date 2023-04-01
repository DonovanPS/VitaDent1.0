import { SonNewHistoryFormAnamnesisComponent } from './../son-new-history-form-anamnesis/son-new-history-form-anamnesis.component';
import { Anamnesis } from './../../models/anamnesis';
import { SonNewHistoryExamenPeriodontalComponent } from './../son-new-history-examen-periodontal/son-new-history-examen-periodontal.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from 'src/app/models/paciente';
import { Subject } from 'rxjs';
import { ExamenPeriodontal } from 'src/app/models/examen-periodontal';


@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.css'],
  template: `
  Message:
  <app-SonNewHistoryExamenPeriodontalComponent></app-SonNewHistoryExamenPeriodontalComponent>

`,
})
export class NewHistoryComponent implements AfterViewInit {

  @ViewChild(SonNewHistoryExamenPeriodontalComponent) child: SonNewHistoryExamenPeriodontalComponent;
  eventSubject: Subject<boolean> = new Subject<boolean>();

  paciente= new Paciente()
  message:string;
  private examenPeriodontal: ExamenPeriodontal;
  private anamnesis: Anamnesis;

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }


  ngAfterViewInit() {
    this.message = this.child.message
  }


  prueba(){
    this.paciente.fechaNacimiento= new Date(this.paciente.fechaNacimiento)
      console.log(this.paciente);
    this.eventSubject.next(true);
    //alert(this.message);

    console.log(this.examenPeriodontal);
    console.log(this.anamnesis);


  }

  pruebaEvento(event: ExamenPeriodontal){
    this.examenPeriodontal = event;
  }

  anamnesisEvento(event: Anamnesis){
    this.anamnesis=event;
  }


}
