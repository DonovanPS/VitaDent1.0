import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from 'src/app/models/paciente';


@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.css']
})
export class NewHistoryComponent {

  paciente= new Paciente()

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }

  prueba(){
    this.paciente.fechaNacimiento= new Date(this.paciente.fechaNacimiento)       
      console.log(this.paciente);
      
  }


}
