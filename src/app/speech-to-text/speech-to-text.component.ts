import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'
import { PrintService } from '../service/print.service'
import { DataPrint } from '../interfaces/settinges.service'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionComponent } from '../component/dialog/dialog-option/dialog-option.component';
import { Observable } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

interface CertificateSubmissionResult {
  fileName: string;
  fileSize: number;
}

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService, PrintService]
})
export class SpeechToTextComponent implements OnInit {

  @ViewChild('content', { static: false }) content: ElementRef;

  /*Iconos*/
  faCheck = faCheck;
  faEdit = faEdit;

  name: string;
  save_name = false;

  service_start = false;
  service_on = false;
  text_button = 'Iniciar';

  service_print_on = 0;
  print_service = false;

  printers: string[] = [];

  logo_empresa: any;
  logo_desarrollador: any;
  imageBase64: any;


  constructor(

    public service: VoiceRecognitionService,
    private _printService: PrintService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    let name = localStorage.getItem("name");
    if (name) {
      this.name = name;
      this.saveName();
    }
    this.service.init();
    this.loadData();
  }



  async loadData() {
    await this.getConnection();
    if (this.service_print_on != 1) {
      this.print_service = false;
    } else {
      this.print_service = true;
      this.getPrinter();
    }
  }


  saveName() {

    if (this.name) {
      this.save_name = true;
      localStorage.setItem("name", this.name);
    } else {
      alert("No hay ningun nombre ingresado.");
    }
  }

  editName() {
    this.save_name = false;
  }

  ngOnInit(): void {
  }

  async generateBase64(source: string): Promise<void> {
    this.imageBase64 = "";
    return new Promise((resolve, reject) => {
      this.http.get(source, { responseType: 'blob' })
        .subscribe(res => {
          const reader = new FileReader();
          reader.onloadend = () => {
            var base64data = reader.result;
            this.imageBase64 = base64data;
            //   console.log(base64data);
            resolve();
          }

          reader.readAsDataURL(res);
          //console.log(res);
        });
    });
  }

  async generarPDF() {

    await this.generateBase64('/assets/img/empresa_logo.jpg');
    this.logo_empresa = this.imageBase64;

    await this.generateBase64('/assets/img/demosoft.jpg');
    this.logo_desarrollador = this.imageBase64;
    // this.stopService();

    const pdfDefinition: any = {
      content: [
        {
          image: this.logo_empresa,
          width: 115,
          absolutePosition: { x: 450, y: 0 }
        },
        {
          text: `\n\n\n\n\n${this.name}\n\n${this.service.text}`,
          // text: 'Lorem Ipsum is simply dummy text \n of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
          image: this.logo_desarrollador,
          width: 50,
          absolutePosition: { x: 515, y: 780 }
        }
      ]
    }

    const pdf = pdfMake.createPdf(pdfDefinition);


    if (pdfDefinition.content[1].text) {
      await this.getConnection();
      if (this.service_print_on != 1) {
        pdf.print();
      } else {
        this.printPDf();
      }
    } else {
      alert("No hay texto que imprimir");
    }



    //pdf.open();

  }


  printPDf() {
    const dialogRef = this.dialog.open(DialogOptionComponent, {
      data: {
        description: "Impresoras instaladas:",
        options: this.printers
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //imprimir

        let printer = localStorage.getItem("print");
        let settings: DataPrint = {
          "printer": printer,
          "doc": `${this.name}\n\n${this.service.text}`,
          "copies": 1
        }

        console.log(settings);

        this._printService.postPrintText(settings).subscribe(
          res => {
            console.log(res);


          },
          err => {
            console.error(err);


          }
        );

      }
    });


  }

  async getConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._printService.getConnection().subscribe(
        res => {
          this.service_print_on = <number>res;
          resolve();

        },
        err => {
          this.service_print_on = 0;
          resolve();

        }
      );
    });
  }

  async postPrint(settings: DataPrint): Promise<void> {
    return new Promise((resolve, reject) => {
      this._printService.postPrintText(settings).subscribe(
        res => {
          console.log(res);
          resolve();

        },
        err => {
          console.error(err);
          resolve();

        }
      );
    });
  }

  async getPrinter(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._printService.getPrinters().subscribe(
        res => {
          console.log(res);
          this.printers = <string[]>res;
          resolve();

        },
        err => {
          console.error(err);
          resolve();

        }
      );
    });
  }


  startService() {

    this.service_start = true;

    if (this.service_on) {
      this.service_on = false;
      this.text_button = "Iniciar";
      this.service.stop();
    } else {

      this.service_on = true;
      this.text_button = "Pausar"
      this.service.start()
    }

  }

  stopService() {
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop()
  }

  restartService() {
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.restart();
    //this.service.stop();

    // this.text_button = "Iniciar";
    //this.service_on = false;

    //this.service.clearRecord();
    //this.service.start();


  }

  copyMessage() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.service.text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  deleteText() {
    this.service.stop();
    this.service.text = '';
    this.service.lastText = 'Reconocimiento de voz.';
    this.text_button = "Iniciar";
    this.service_on = false;
  }
}
