import { Injectable } from '@angular/core';

//webkit api Google
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text: string = '';
  public lastText: string = 'Reconocimiento de voz.';
  tempWords: string;
  //Manejar Acciones (Grabando o no)
  service_on = false;
  text_button = 'Iniciar';

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      this.tempWords = transcript;

      //N palabras escuchadas
      var numWords = this.countString(transcript);
      //N plabaras visbles
      var numWordsClient = 10;

      //si hay más de 10 palabaras, mostrar las ultimas 10
      if (numWords > numWordsClient) {
        var __text = this.correctText(transcript, 1);
        var _text_ = __text.split(' ', numWords);
        var aNew = _text_.slice(numWords - numWordsClient);
        var newText = '';

        for (var i = 0; i < aNew.length; i++) {
          newText = newText + aNew[i] + " ";
        }

        this.lastText = newText;

      } else {
        this.lastText = transcript;
      }

      console.log(transcript);
    });

    this.recognition.onend = () => {
      console.log("Se dejo de hablar");
    }

    this.recognition.onerror = () => {
      console.log('Ha ocurrido algun error');
    }
  }



  start() {
    this.recognition.abort();
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Reconocimineto de voz iniciado");
    this.service_on = true;
    this.text_button = "Pausar"
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.abort();
        console.log("Reconocimineto de voz finalizado")
        this.service_on = false;
        this.text_button = "Iniciar"
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.abort();
    console.log("Reconocimineto de voz finalizado")
    this.service_on = false;
    this.text_button = "Iniciar";
  }

  wordConcat() {
    //Agregar ; y saltos de linea
    this.tempWords = this.tempWords.replace(/punto y coma/gi, ';');
    this.tempWords = this.filterWords(this.tempWords);

    this.text = this.text + this.tempWords + ' ';

    //Correccion de espacios entre signos
    this.text = this.text.replace(/ ;/g, ';');
    this.text = this.text.replace(/ ,/g, ',');
    this.text = this.text.replace(/ \n/g, '\n');
    this.text = this.text.replace(/\n /g, '\n');
    this.text = this.text.replace(/ \n /g, '\n');

    this.tempWords = '';
    this.text = this.correctText(this.text, 1);
  }

  //Limpiar texto
  clearRecord() {
    this.text = '';
  }

  correctText(text: string, opt: number) {
    //elimina varios espacios 
    if (opt == 1) {
      text = text.replace(/[ ]+/g, " ");
      return text;
    } else if (opt == 2) { //Elimina espacios al final
      text = text.replace(/[ ]+/g, " ");
      text = text.replace(/^ /, "");
      // text = text.replace(/ $/, "");
      return text;
    } else if (opt == 3) { //Elimina espacios al final, principio y de más
      text = text.replace(/[ ]+/g, " ");
      text = text.replace(/^ /, "");
      text = text.replace(/ $/, "");
      return text;
    }
  }


  //devuelve numero de palabras de un string
  countString(text: string) {
    text = text.replace(/\r?\n/g, " ");
    text = this.correctText(text, 3);
    var _text = text.split(" ");
    var numWords = _text.length;

    return numWords;
  }

  //Remplazar palabras 
  filterWords(text: any) {
    text = this.correctText(text, 3);
    text = text.toLowerCase();
    let _text = text.split(" ");

    let finally_text = '';

    _text.forEach(element => {
      if (element == 'enter') {
        finally_text = finally_text + '\n';
      } else if (element == 'coma') {
        finally_text = finally_text + ', ';
      } else {
        finally_text = finally_text + element + " ";
      }
    });

    return finally_text;
  }
}