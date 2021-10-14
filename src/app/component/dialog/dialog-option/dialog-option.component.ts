import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog.interface';

@Component({
  selector: 'app-dialog-option',
  templateUrl: './dialog-option.component.html',
  styleUrls: ['./dialog-option.component.scss']
})

export class DialogOptionComponent implements OnInit {

  printers: string[] = [];
  printer_selected: string;

  copies = 1;

  constructor(
    public dialogRef: MatDialogRef<DialogOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    let print = localStorage.getItem("print");
    if (print) {
      this.printer_selected = print;
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
    localStorage.setItem("print", this.printer_selected);
    sessionStorage.setItem("copies",this.copies.toString());
  }

}
