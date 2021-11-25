import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatDialog } from '@angular/material/dialog';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as $ from 'jquery';
import { GenericAcceptDialogComponent } from '../component/dialog/generic-accept-dialog/generic-accept-dialog.component';
import { Language } from '../interfaces/languages.interface';



@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [
    VoiceRecognitionService
  ]
})
export class SpeechToTextComponent implements OnInit {
 
  @ViewChild('content', { static: false }) content: ElementRef;

  selectedLanguage: string;
  languages: Language[] = [];

  service_start = false;
  service_on = false;
  text_button = 'Iniciar';

  btn_copy = false;

  constructor(
    public service: VoiceRecognitionService,
    private dialog: MatDialog,
  ) {
    this.selectedLanguage = service.lang;
    this.languages = service.languge;
    this.service.init();
  }

  ngOnInit(): void {
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
    let pdfDefinition = {
      pageSize: 'LETTER',
      pageMargins: [20, 60],
      content: [
        {
          text: this.service.text,
        }
      ]
    }
    
    if (this.service.text) {
      //crea un pdf
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.print();

    } else {
      this.dialogAccept("Sin contenido", "No hay ningun texto disponible para imprimir.");
    }
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
}