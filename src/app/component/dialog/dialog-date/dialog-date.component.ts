import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog.interface';


import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  },
};



@Component({
  selector: 'app-dialog-date',
  templateUrl: './dialog-date.component.html',
  styleUrls: ['./dialog-date.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DialogDateComponent implements OnInit {
  date = new FormControl(moment());

  constructor(
    public dialogRef: MatDialogRef<DialogDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    }

    if (!data.falso) {
      data.falso = "Cancelar";
    }

    console.log(data.options);
    

  }

  ngOnInit(): void {
  }

  saveDate() {
    console.log(this.date.value);
    
  }
}