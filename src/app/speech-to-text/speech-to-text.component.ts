import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service'

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.scss'],
  providers: [VoiceRecognitionService]
})
export class SpeechToTextComponent implements OnInit {

 

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    this.service.start()
  }

  stopService(){
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop()
  }

  restartService(){
    this.service.lastText = 'Reconocimiento de voz.';
    this.service.stop();
    this.service.clearRecord();
    this.service.start();
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

  }

}
