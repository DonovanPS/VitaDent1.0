import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.css']
})
export class NewHistoryComponent {

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }
}
