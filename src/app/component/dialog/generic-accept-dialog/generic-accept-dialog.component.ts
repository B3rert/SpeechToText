import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog.interface';

@Component({
  selector: 'app-generic-accept-dialog',
  templateUrl: './generic-accept-dialog.component.html',
  styleUrls: ['./generic-accept-dialog.component.scss']
})
export class GenericAcceptDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenericAcceptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }


  ngOnInit(): void {
  }

}
