import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {
 
  service_on = false;
  text_button = 'Iniciar';

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){

    if (this.service_on) {
      this.service_on = false;
      this.text_button = "Iniciar";
      this.service.stop();
    }else{
      
    this.service_on  = true;
    this.text_button = "Pausar"
    this.service.start()
    }

  }

  stopService(){
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop()
  }

  restartService(){
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop();
    
    this.text_button = "Iniciar";
    this.service_on = false;

    this.service.clearRecord();
    this.service.start();

    this.text_button = "Pausar"
    this.service_on = true;

  }

  copyMessage(){
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

  deleteText(){
    this.service.stop();
    this.service.text = '';
    this.service.lastText = 'Reconocimiento de voz.';
    this.text_button = "Iniciar";
    this.service_on = false;
  }
}
