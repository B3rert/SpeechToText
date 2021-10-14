import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import	 {DialogData} from 'src/app/interfaces/dialog.interface';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-option',
  templateUrl: './dialog-option.component.html',
  styleUrls: ['./dialog-option.component.scss']
})

export class DialogOptionComponent implements OnInit {
  selectedValue: string = "steak-0";

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  copies = 1;
  favoriteSeason: string;
  seasons: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    let print = localStorage.getItem("print");

    if (print) {
      this.favoriteSeason = print;
    }

   
  this.seasons = data.options;

    if (!data.verdadero) {
      data.verdadero = "Aceptar";
    } 
    
    if (!data.falso) {
      data.falso = "Cancelar";
    }
   }

  ngOnInit(): void {
  }
  
  savePrintDefault(){
   localStorage.setItem("print",this.favoriteSeason);
  }

}
