import { Injectable } from '@angular/core';

//webkit api Google
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  languages =  {
    "Afrikaans": [
      ["South Africa", "af-ZA"]
    ],
    "Arabic" : [
      ["Algeria","ar-DZ"],
      ["Bahrain","ar-BH"],
      ["Egypt","ar-EG"],
      ["Israel","ar-IL"],
      ["Iraq","ar-IQ"],
      ["Jordan","ar-JO"],
      ["Kuwait","ar-KW"],
      ["Lebanon","ar-LB"],
      ["Morocco","ar-MA"],
      ["Oman","ar-OM"],
      ["Palestinian Territory","ar-PS"],
      ["Qatar","ar-QA"],
      ["Saudi Arabia","ar-SA"],
      ["Tunisia","ar-TN"],
      ["UAE","ar-AE"]
    ],
    "Basque": [
      ["Spain", "eu-ES"]
    ],
    "Bulgarian": [
      ["Bulgaria", "bg-BG"]
    ],
    "Catalan": [
      ["Spain", "ca-ES"]
    ],
    "Chinese Mandarin": [
      ["China (Simp.)", "cmn-Hans-CN"],
      ["Hong Kong SAR (Trad.)", "cmn-Hans-HK"],
      ["Taiwan (Trad.)", "cmn-Hant-TW"]
    ],
    "Chinese Cantonese": [
      ["Hong Kong", "yue-Hant-HK"]
    ],
    "Croatian": [
      ["Croatia", "hr_HR"]
    ],
    "Czech": [
      ["Czech Republic", "cs-CZ"]
    ],
    "Danish": [
      ["Denmark", "da-DK"]
    ],
    "English": [
      ["Australia", "en-AU"],
      ["Canada", "en-CA"],
      ["India", "en-IN"],
      ["Ireland", "en-IE"],
      ["New Zealand", "en-NZ"],
      ["Philippines", "en-PH"],
      ["South Africa", "en-ZA"],
      ["United Kingdom", "en-GB"],
      ["United States", "en-US"]
    ],
    "Farsi": [
      ["Iran", "fa-IR"]
    ],
    "French": [
      ["France", "fr-FR"]
    ],
    "Filipino": [
      ["Philippines", "fil-PH"]
    ],
    "Galician": [
      ["Spain", "gl-ES"]
    ],
    "German": [
      ["Germany", "de-DE"]
    ],
    "Greek": [
      ["Greece", "el-GR"]
    ],
    "Finnish": [
      ["Finland", "fi-FI"]
    ],
    "Hebrew" :[
      ["Israel", "he-IL"]
    ],
    "Hindi": [
      ["India", "hi-IN"]
    ],
    "Hungarian": [
      ["Hungary", "hu-HU"]
    ],
    "Indonesian": [
      ["Indonesia", "id-ID"]
    ],
    "Icelandic": [
      ["Iceland", "is-IS"]
    ],
    "Italian": [
      ["Italy", "it-IT"],
      ["Switzerland", "it-CH"]
    ],
    "Japanese": [
      ["Japan", "ja-JP"]
    ],
    "Korean": [
      ["Korea", "ko-KR"]
    ],
    "Lithuanian": [
      ["Lithuania", "lt-LT"]
    ],
    "Malaysian": [
      ["Malaysia", "ms-MY"]
    ],
    "Dutch": [
      ["Netherlands", "nl-NL"]
    ],
    "Norwegian": [
      ["Norway", "nb-NO"]
    ],
    "Polish": [
      ["Poland", "pl-PL"]
    ],
    "Portuguese": [
      ["Brazil", "pt-BR"],
      ["Portugal", "pt-PT"]
    ],
    "Romanian": [
      ["Romania", "ro-RO"]
    ],
    "Russian": [
      ["Russia", "ru-RU"]
    ],
    "Serbian": [
      ["Serbia", "sr-RS"]
    ],
    "Slovak": [
      ["Slovakia", "sk-SK"]
    ],
    "Slovenian": [
      ["Slovenia", "sl-SI"]
    ],
    "Spanish": [
      ["Argentina", "es-AR"],
      ["Bolivia", "es-BO"],
      ["Chile", "es-CL"],
      ["Colombia", "es-CO"],
      ["Costa Rica", "es-CR"],
      ["Dominican Republic", "es-DO"],
      ["Ecuador", "es-EC"],
      ["El Salvador", "es-SV"],
      ["Guatemala", "es-GT"],
      ["Honduras", "es-HN"],
      ["México", "es-MX"],
      ["Nicaragua", "es-NI"],
      ["Panamá", "es-PA"],
      ["Paraguay", "es-PY"],
      ["Perú", "es-PE"],
      ["Puerto Rico", "es-PR"],
      ["Spain", "es-ES"],
      ["Uruguay", "es-UY"],
      ["United States", "es-US"],
      ["Venezuela", "es-VE"]
    ],
    "Swedish": [
      ["Sweden", "sv-SE"]
    ],
    "Thai": [
      ["Thailand", "th-TH"]
    ],
    "Turkish": [
      ["Turkey", "tr-TR"]
    ],
    "Ukrainian": [
      ["Ukraine", "uk-UA"]
    ],
    "Vietnamese": [
      ["Viet Nam", "vi-VN"]
    ],
    "Zulu": [
      ["South Africa", "zu-ZA"]
    ]
  };  

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

    //Manejo de errores

    //Se ha dejado de escuchar y se finaliza el servicio
    this.recognition.onend = (e) => {
      console.log('Se ha dejado de hablar');
      this.service_on = false;
      this.text_button = "Iniciar"
      //console.log(e);
    }

    //Ha ocurrido alfun error y se ha detenido el servicio
    this.recognition.onerror = (e) => {
      console.error('Algo salió mal, ERROR: ' + e.error);
      this.service_on = false;
      this.text_button = "Iniciar";
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
        console.log("Reconocimineto de voz iniciado");
        this.service_on = true;
        this.text_button = "Pausar"
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

  restart() {
    this.stop();
    this.clearRecord();
    this.start();
    console.log("Reconocimineto de voz iniciado");
    this.service_on = true;
    this.text_button = "Pausar"
  }


  private wordConcat() {
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

  private correctText(text: string, opt: number) {
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
  private countString(text: string) {
    text = text.replace(/\r?\n/g, " ");
    text = this.correctText(text, 3);
    var _text = text.split(" ");
    var numWords = _text.length;

    return numWords;
  }

  //Remplazar palabras 
  private filterWords(text: any) {
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