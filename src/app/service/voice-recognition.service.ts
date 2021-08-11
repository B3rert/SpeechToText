import { Injectable } from '@angular/core';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

 recognition =  new webkitSpeechRecognition();
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
      this.lastText = transcript;
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
  }

  clearRecord(){
    this.text = '';
  }
}


//angular-voice-recognition\node_modules