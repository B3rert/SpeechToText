import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'
import { PrintService } from '../service/print.service'
import { DataPrint } from '../interfaces/settinges.interface'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
import { DialogOptionComponent } from '../component/dialog/dialog-option/dialog-option.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { HttpClient } from '@angular/common/http';
/**Iconos */
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';

/***/
import * as $ from 'jquery';
import { GenericAcceptDialogComponent } from '../component/dialog/generic-accept-dialog/generic-accept-dialog.component';
import { DialogFormatComponent } from '../component/dialog/dialog-format/dialog-format.component';
import { Language } from '../interfaces/languages.interface';
/** */

declare var configuraciones: any;

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { DialogDateComponent } from '../component/dialog/dialog-date/dialog-date.component';

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
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [
    VoiceRecognitionService,
    PrintService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class SpeechToTextComponent implements OnInit {
  date = new FormControl(moment());
  //hour_input: any = "12:00 PM";
  hour_input: any = "";

  @ViewChild('content', { static: false }) content: ElementRef;

  selectedLanguage: string;
  languages: Language[] = [];

  /*Iconos*/
  faCheck = faCheck;
  faEdit = faEdit;
  faCogs = faCogs;
  faPlus = faPlus;
  faBan = faBan;

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

  btn_copy = false;
  lang: any;
  title_report = configuraciones.title_report;
  column1 = configuraciones.column1;
  column2 = configuraciones.column2;
  column3 = configuraciones.column3;
  text_info = configuraciones.text_info;
  text_finally = configuraciones.text_finally;

  nueva_cita_fecha: string = "";
  view_cita_fecha = false;
  view_cita_fecha_add = true;
  edit_cita_fecha = false;
  printDate = true;

  print_text_finally = `*${this.text_finally} ${this.nueva_cita_fecha}*`;

  is_login = false;
  permnent_session = false;

  constructor(
    public service: VoiceRecognitionService,
    private _printService: PrintService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.hour_input = this.getHoraActual(4);
    this.selectedLanguage = service.lang;
    this.languages = service.languge;
    let name = localStorage.getItem("name");
    if (name) {
      this.name = name;
      this.saveName();
    }
    this.service.init();
    this.loadData();
  }

  ngOnInit(): void {
  }

  //Inicializa de froma asincrona las funciones necesarias
  async loadData() {
    await this.getConnection();
    if (this.service_print_on != 1) {
      this.print_service = false;
    } else {
      this.print_service = true;
      this.getPrinter();
    }
  }

  //Guarda el nombre del emisor
  saveName() {
    if (this.name) {
      this.save_name = true;
      localStorage.setItem("name", this.name);
    } else {
      alert("No hay ningun nombre ingresado.");
    }
  }

  //Muestra el input para esitar el nombre del emisor
  editName() {
    this.save_name = false;
  }

  selectedFormat() {

    let formats: string[] = [
      "Columnas",
      "Sin Columnas",
      "Sin Formato"
    ];

    const dialogRef = this.dialog.open(DialogFormatComponent, {
      data: {
        tittle: "Formatos de impresión disponibles:",
        options: formats
      }
    });

    //Obtiene i la opcion fue "Aceptar"
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  //Convierte una imagen dada en base64 la gurada en imageBase64
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

  //Confirmar la fecha y hora de la cita
  confirmDate() {
    //Formate date
    var fecha = this.date.value._d.getDate() + '/' + (this.date.value._d.getMonth() + 1) + '/' + this.date.value._d.getFullYear();
    this.nueva_cita_fecha = fecha + " " + this.hour_input;
    this.edit_cita_fecha = false;
    this.view_cita_fecha_add = false;
    this.view_cita_fecha = true;
  }

  //Agregar fecha y hora a la cita
  addAppointment() {
    this.hour_input = this.getHoraActual(4);
    this.edit_cita_fecha = true;
    this.view_cita_fecha_add = false;
    this.view_cita_fecha = false;
  }

  //Obtiene la fecha y hora actual
  getHoraActual(opt: number) {
    var hoy = new Date();
    var fecha = hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();

    let hours = hoy.getHours();
    let suffix = (hours >= 12) ? ' p.m.' : ' a.m.';
    hours = (hours > 12) ? hours - 12 : hours;
    hours = (hours.toString() == '00') ? 12 : hours;

    let hours_str: string;

    if (hours.toString().length == 1) {
      hours_str = `0${hours}`;
    } else {
      hours_str = hours.toString();
    }

    var hora = hours_str + ':' + hoy.getMinutes() + ':' + hoy.getSeconds() + suffix;

    /*opt 1: hora actual
    *opt 2: fecha actual
    *opt 3: fecha y hora actual
    *opt 4: hora y minutos HH:MM TT
    */
    if (opt == 1) {
      return hora;
    } else if (opt == 2) {
      return fecha;
    } else if (opt == 3) {
      return fecha + " " + hora;
    } else if (opt == 4) {
      // return "1:16 PM"
      let hours = hoy.getHours();
      let _suffix = (hours >= 12) ? ' PM' : ' AM';
      hours = (hours > 12) ? hours - 12 : hours;
      hours = (hours.toString() == '00') ? 12 : hours;

      let minutes = hoy.getMinutes();
      let minutes_str: string;
      if (minutes.toString().length == 1) {
        minutes_str = `0${minutes}`;
      } else {
        minutes_str = minutes.toString();
      }
      return hours + ":" + minutes_str + _suffix;
    }
  }
  //Transforma la primera letra de un texto en Mayuscula
  transformCapitalize(text: string) {
    text = text.toLocaleLowerCase();
    function capitalizarPrimeraLetra(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return capitalizarPrimeraLetra(text);
  }

  //Genera un PDF
  async generarPDF() {
    //texto al final del documento
    this.print_text_finally = `*${this.text_finally} ${this.nueva_cita_fecha}*`;

    let format = localStorage.getItem("format");
    if (!format) {
      format = "Columnas"
    }

    if (!this.printDate) {
      this.print_text_finally = "";
    }

    let fecha_actual = this.getHoraActual(3);

    let table_content: any[] = [
      [{ text: this.column1, style: 'header_table' }, { text: this.column2, style: "header_table" }, { text: this.column3, style: 'header_table' }],
    ];

    let text_print = this.service.text;
    let _text = text_print.split("\n");
    _text.forEach(element => {
      let __text = element.split(",,");
      if (__text.length == 2) {
        let row = ['', __text[0].toUpperCase(), this.transformCapitalize(this.service.correctText(__text[1], 3))];
        table_content.push(row);
      } else {
        let text_value = ""
        for (let index = 0; index < __text.length; index++) {
          if (index != 0) {
            text_value = text_value + __text[index]
          }
        }
        let row = ['', __text[0].toUpperCase(), this.transformCapitalize(this.service.correctText(text_value, 3))];
        table_content.push(row);
      }
    });

    //Logos convertidos a base64
    //await this.generateBase64('/app/img/empresa_logo.jpg');
    await this.generateBase64('/assets/img/empresa_logo.jpg');
    this.logo_empresa = this.imageBase64;

    await this.generateBase64('/assets/img/demosoft.jpg');
    //await this.generateBase64('/app/img/demosoft.jfif');
    this.logo_desarrollador = this.imageBase64;
    // this.stopService();

    let pdfDefinition;

    if (format == "Columnas") {
      //Cuerpo del pdf
      pdfDefinition = {
        pageSize: 'LETTER',
        pageMargins: [20, 110, 20, 80],
        footer: (currentPage, pageCount, pageSize) => {
          return [
            {
              layout: 'noBorders',
              table: {
                widths: ['40%', '50%', '10%'],

                body: [
                  [
                    //{ text: `Atendió: ${this.name}`, bold: true },
                    //{ text: 'blob:http://localhost:4200/be8bcf5c-2119-43a5-b419-b77b3f9a99e2', style: 'gray_font' }, ''
                    '', '', ''
                  ],
                  [
                    {
                      layout: 'noBorders',
                      table: {
                        widths: ['auto', '*'],
                        body: [
                          ['', ''],
                          ['', ''],
                          [
                            { text: `${fecha_actual}`, style: 'gray_font_bottom' },
                            { text: ` Página ${currentPage} de ${pageCount}`, fontSize: 8 }
                          ]
                        ]
                      }
                    },
                    //{ text: `\n\n${fecha_actual}. Página ${currentPage} de ${pageCount}`, style: 'gray_font_bottom' },
                    { text: this.text_info, style: 'blue_font' },
                    {
                      image: this.logo_desarrollador,
                      width: 50,
                      //absolutePosition: { x: 540, y: 715 }
                    }]
                ]
              },
              margin: [20, 10, 10, 250]
            }
          ];
        },
        header: () => {
          return [

            {
              text: this.title_report, style: "title", margin: [0, 30, 0, 0]
            },
            {
              text: this.name, bold: true, margin: [20, 33, 0, 0]
            },
            {
              image: this.logo_empresa,
              width: 115,
              absolutePosition: { x: 480, y: 0 }
            }
          ];
        },
        content: [
          {
            layout: 'headerLineOnly',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['15%', '35%', '50%'],
              body: table_content
            },


            // text: `\n\n\n\n\n${this.name}\n\n${this.service.text}`,
            //text: '\n\n\n\nLorem Ipsum is simply dummy text \n of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            text: `\n\n${this.print_text_finally}`, style: 'date_cita'
          }
        ],
        styles: {
          date_cita: {
            bold: true,
            color: "#860d0d",
            alignment: 'center',
            fontSize: 16
          },
          title: {
            bold: true,
            color: "#860d0d",
            alignment: 'center',
            fontSize: 14
          },
          header_table: {
            bold: true,
            color: "#860d0d",
            alignment: 'left',
            fontSize: 11
          },
          gray_font: {
            fontSize: 8,
            color: '#7f7f7f',
            alignment: 'center',
          },
          gray_font_bottom: {
            fontSize: 8,
            color: '#7f7f7f',
            alignment: 'left',
          },
          blue_font: {
            fontSize: 8,
            color: '#0000ff',
            alignment: 'center',
          }

        }
      }
    } else if (format == "Sin Columnas") {
      pdfDefinition = {
        pageSize: 'LETTER',
        pageMargins: [20, 110, 20, 80],
        footer: (currentPage, pageCount, pageSize) => {
          return [
            {
              layout: 'noBorders',
              table: {
                widths: ['40%', '50%', '10%'],

                body: [
                  [
                    //{ text: `Atendió: ${this.name}`, bold: true },
                    //{ text: 'blob:http://localhost:4200/be8bcf5c-2119-43a5-b419-b77b3f9a99e2', style: 'gray_font' }, ''
                    '', '', ''
                  ],
                  [
                    {
                      layout: 'noBorders',
                      table: {
                        widths: ['auto', '*'],
                        body: [
                          ['', ''],
                          ['', ''],
                          [
                            { text: `${fecha_actual}`, style: 'gray_font_bottom' },
                            { text: ` Página ${currentPage} de ${pageCount}`, fontSize: 8 }
                          ]
                        ]
                      }
                    },
                    //{ text: `\n\n${fecha_actual}. Página ${currentPage} de ${pageCount}`, style: 'gray_font_bottom' },
                    { text: this.text_info, style: 'blue_font' },
                    {
                      image: this.logo_desarrollador,
                      width: 50,
                      //absolutePosition: { x: 540, y: 715 }
                    }]
                ]
              },
              margin: [20, 10, 10, 250]
            }
          ];
        },
        header: () => {
          return [

            {
              text: this.title_report, style: "title", margin: [0, 30, 0, 0]
            },
            {
              text: this.name, bold: true, margin: [20, 33, 0, 0]
            },
            {
              image: this.logo_empresa,
              width: 115,
              absolutePosition: { x: 480, y: 0 }
            }
          ];
        },
        content: [
          {
            layout: 'headerLineOnly',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['100%'],
              body: [
                [{ text: this.column3, style: 'header_table' }],
                [this.transformCapitalize(this.service.text)]
              ]
            }
            // text: `\n\n\n\n\n${this.name}\n\n${this.service.text}`,
            //text: '\n\n\n\nLorem Ipsum is simply dummy text \n of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            text: `\n\n${this.print_text_finally}`, style: 'date_cita'
          }
        ],
        styles: {
          date_cita: {
            bold: true,
            color: "#860d0d",
            alignment: 'center',
            fontSize: 16
          },
          title: {
            bold: true,
            color: "#860d0d",
            alignment: 'center',
            fontSize: 14
          },
          header_table: {
            bold: true,
            color: "#860d0d",
            alignment: 'left',
            fontSize: 11
          },
          gray_font: {
            fontSize: 8,
            color: '#7f7f7f',
            alignment: 'center',
          },
          gray_font_bottom: {
            fontSize: 8,
            color: '#7f7f7f',
            alignment: 'left',
          },
          blue_font: {
            fontSize: 8,
            color: '#0000ff',
            alignment: 'center',
          }
        }
      }
    } else if (format == "Sin Formato") {
      pdfDefinition = {
        pageSize: 'LETTER',
        pageMargins: [20, 60],

        content: [
          {
            text: this.name, bold: true
          },
          {
            text: `\n${this.service.text}`,
            //text: '\n\n\n\nLorem Ipsum is simply dummy text \n of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            text: `\n\n${this.print_text_finally}`
          }
        ]
      }
    }

    //crea un pdf
    const pdf = pdfMake.createPdf(pdfDefinition);

    /*Conprueba si PrintService esta activo
    *Si está activo se usan las funciones del servicio
    *sino se hace una impresion nativa
    */

    await this.getConnection();
    if (this.service_print_on != 1) {
      pdf.print();
    } else {
      await this.getPrinter();
      this.printPDf();
    }
    /*
    if (pdfDefinition.content[1].text) {
     
    } else {
      alert("No hay texto que imprimir");
    }
    */
    //pdf.open();
  }



  //Imprime a través de print service
  printPDf() {
    let format = localStorage.getItem("format");
    if (!format) {
      format = "Columnas"
    }

    //Muestra dialogo con las impresoras unstaladas
    const dialogRef = this.dialog.open(DialogOptionComponent, {
      data: {
        verdadero: "Imprimir",
        tittle: "Imprimir:",
        options: this.printers
      }
    });

    //Obtiene i la opcion fue "Aceptar"
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //imprimir
        let printer = localStorage.getItem("print");
        let copies: number = + sessionStorage.getItem("copies");

        //Parametros necesarios para imprimir <<Api print en PritService>>
        let settings: DataPrint = {
          "printer": printer, //Nombre de la impresora
          "doc": this.service.text, //Texto del documento
          "name_emited": this.name,
          "report_title": this.title_report,
          "column1": this.column1,
          "column2": this.column2,
          "column3": this.column3,
          "text_info": this.text_info,
          "format": format,
          "copies": copies //Numero de copias
        }

        //Consumo api para imprimir, falta controlar respuestas
        this._printService.postPrintText(settings).subscribe(
          res => {
            let result: number = <number>res;
            console.log(res);

            if (result == 2) {
              this.dialogAccept("Impresora no disponible.", `Verifique que ${printer} esté disponible para imprimir.`);
            }
          },
          err => {
            console.error(err);

            this.dialogAccept("Algo salió mal", err.error);
          }
        );
      }
    });
  }

  //Dialogo con un texto y un boton de aceptar
  dialogAccept(tittle: string, description: string) {
    this.dialog.open(GenericAcceptDialogComponent, {
      data: {
        tittle: tittle,
        description: description
      }
    });
  }

  //Confirmar conexion con PrintService
  async getConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._printService.getConnection().subscribe(
        res => {
          this.service_print_on = <number>res;
          resolve();
        },
        err => {
          this.service_print_on = 0;
          console.error(err);
          resolve();
        }
      );
    });
  }

  //Consumo api para imprimir
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

  //Obtinene una lista de impresoras instaladas en la maquina
  async getPrinter(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._printService.getPrinters().subscribe(
        res => {
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

  //inicia el servicio que estrá escuchando todo lo que el microfono capte
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

  //Detiene el servicio  del reconocimiento voz
  stopService() {
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop()
  }

  //Reinicia el servicio del reconocimiento de voz
  restartService() {
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.restart();
  }

  //Copia el texto que se ha reconocido al portapapeles
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

    $('#texto').focus().select();

    if (!this.btn_copy) {
      this.btn_copy = true;

      setTimeout(() => {
        this.btn_copy = false;
      }, 1000);
    }

  }

  //elimina el texto que se ha reconocido 
  deleteText() {
    this.service.stop();
    this.service.text = '';
    this.service.lastText = 'Reconocimiento de voz.';
    this.text_button = "Iniciar";
    this.service_on = false;
  }

  activateProduct() {

    console.log(this.generateUUID());
    console.log(this.generateUUID().length);
    console.log(Navigator);
    
    //this.is_login = true;

  }

  generateUUID(): string {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
}
