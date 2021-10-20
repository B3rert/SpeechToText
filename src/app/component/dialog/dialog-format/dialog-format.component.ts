import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog.interface';

@Component({
  selector: 'app-dialog-format',
  templateUrl: './dialog-format.component.html',
  styleUrls: ['./dialog-format.component.scss']
})
export class DialogFormatComponent implements OnInit {

 
  printers: string[] = [];
  printer_selected: string;

  copies = 1;

  constructor(
    public dialogRef: MatDialogRef<DialogFormatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    let print = localStorage.getItem("format");
    if (print) {
      this.printer_selected = print;
    }else{
      this.printer_selected = "Columnas"
    }

    this.printers = data.options;

    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    }

    if (!data.falso) {
      data.falso = "Cancelar";
    }
  }

  ngOnInit(): void {
  }

  savePrintDefault() {
   localStorage.setItem("format",this.printer_selected);
  }


}
