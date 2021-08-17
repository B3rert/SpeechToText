import { Injectable } from '@angular/core';

//webkit api Google
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {


  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  public lastText = 'Reconocimiento de voz.';
  tempWords;

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
      //this.text = transcript;

      //Numero de palabras escuchadas
      var numWords = this.countString(transcript);
      //numero de plabaras visbles
      var numWordsClient = 10;

      //si hay más de 10 palabaras, mostrar las ultimas 10
      if (numWords > numWordsClient) {
        var __text = this.correctText(transcript);
        var _text_ = __text.split(' ', numWords);
        var aNew = _text_.slice(numWords - numWordsClient);
        var newText = '';

        for (var i = 0; i < aNew.length; i++) {
          newText = newText + aNew[i] + " ";
        }

        // console.log(numWords + " " + newText);
        this.lastText = newText;
      } else {
        // console.log(numWords + " " + transcript);
        this.lastText = transcript;
      }

      //this.lastText = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.recognition.stop();
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Reconocimineto de voz iniciado")
    this.recognition.addEventListener('end', (condition) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("Reconocimineto de voz finalizado")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("Reconocimineto de voz finalizado")
  }

  wordConcat() {
    this.text = this.text + this.tempWords + ' ';
    this.tempWords = '';
    this.text = this.correctText(this.text);
  }

  clearRecord() {
    this.text = '';
  }


  //Correccion de espacios en blanco
  correctText(text: string) {
    text = text.replace(/[ ]+/g, " ");
    //text = text.replace(/^ /, "");
    //text = text.replace(/ $/, "");

    return text;
  }

  lineEnter() {
    this.stop();
    this.text += '\n';
  }

  //devuelve numero de palabras de un string
  countString(text: string) {
    text = text.replace(/\r?\n/g, " ");
    text = text.replace(/[ ]+/g, " ");
    text = text.replace(/^ /, "");
    text = text.replace(/ $/, "");
    var _text = text.split(" ");
    var numWords = _text.length;

    return numWords;
  }

}


//angular-voice-recognition\node_modules