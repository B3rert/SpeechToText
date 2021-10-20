import { Injectable } from '@angular/core';
import { Language } from '../interfaces/languages.interface';

//webkit api Google
declare var webkitSpeechRecognition: any;
declare var configuraciones: any;


@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
   
 lang = 'es-ES';



  languge: Language[] = [
    {
        "viewValue": "Afrikaans (South Africa)",
        "value": "af-ZA"
    },
    {
        "viewValue": "Albanian (Albania)",
        "value": "sq-AL"
    },
    {
        "viewValue": "Amharic (Ethiopia)",
        "value": "am-ET"
    },
    {
        "viewValue": "Arabic (Algeria)",
        "value": "ar-DZ"
    },
    {
        "viewValue": "Arabic (Bahrain)",
        "value": "ar-BH"
    },
    {
        "viewValue": "Arabic (Egypt)",
        "value": "ar-EG"
    },
    {
        "viewValue": "Arabic (Iraq)",
        "value": "ar-IQ"
    },
    {
        "viewValue": "Arabic (Israel)",
        "value": "ar-IL"
    },
    {
        "viewValue": "Arabic (Jordan)",
        "value": "ar-JO"
    },
    {
        "viewValue": "Arabic (Kuwait)",
        "value": "ar-KW"
    },
    {
        "viewValue": "Arabic (Lebanon)",
        "value": "ar-LB"
    },
    {
        "viewValue": "Arabic (Morocco)",
        "value": "ar-MA"
    },
    {
        "viewValue": "Arabic (Oman)",
        "value": "ar-OM"
    },
    {
        "viewValue": "Arabic (Qatar)",
        "value": "ar-QA"
    },
    {
        "viewValue": "Arabic (Saudi Arabia)",
        "value": "ar-SA"
    },
    {
        "viewValue": "Arabic (State of Palestine)",
        "value": "ar-PS"
    },
    {
        "viewValue": "Arabic (Tunisia)",
        "value": "ar-TN"
    },
    {
        "viewValue": "Arabic (United Arab Emirates)",
        "value": "ar-AE"
    },
    {
        "viewValue": "Arabic (Yemen)",
        "value": "ar-YE"
    },
    {
        "viewValue": "Armenian (Armenia)",
        "value": "hy-AM"
    },
    {
        "viewValue": "Azerbaijani (Azerbaijan)",
        "value": "az-AZ"
    },
    {
        "viewValue": "Basque (Spain)",
        "value": "eu-ES"
    },
    {
        "viewValue": "Bengali (Bangladesh)",
        "value": "bn-BD"
    },
    {
        "viewValue": "Bengali (India)",
        "value": "bn-IN"
    },
    {
        "viewValue": "Bosnian (Bosnia and Herzegovina)",
        "value": "bs-BA"
    },
    {
        "viewValue": "Bulgarian (Bulgaria)",
        "value": "bg-BG"
    },
    {
        "viewValue": "Burmese (Myanmar)",
        "value": "my-MM"
    },
    {
        "viewValue": "Catalan (Spain)",
        "value": "ca-ES"
    },
    {
        "viewValue": "Chinese, Cantonese (Traditional Hong Kong)",
        "value": "yue-Hant-HK"
    },
    {
        "viewValue": "Chinese, Mandarin (Simplified, China)",
        "value": "zh"
    },
    {
        "viewValue": "Chinese, Mandarin (Traditional, Taiwan)",
        "value": "zh-TW"
    },
    {
        "viewValue": "Croatian (Croatia)",
        "value": "hr-HR"
    },
    {
        "viewValue": "Czech (Czech Republic)",
        "value": "cs-CZ"
    },
    {
        "viewValue": "Danish (Denmark)",
        "value": "da-DK"
    },
    {
        "viewValue": "Dutch (Belgium)",
        "value": "nl-BE"
    },
    {
        "viewValue": "Dutch (Netherlands)",
        "value": "nl-NL"
    },
    {
        "viewValue": "English (Australia)",
        "value": "en-AU"
    },
    {
        "viewValue": "English (Canada)",
        "value": "en-CA"
    },
    {
        "viewValue": "English (Ghana)",
        "value": "en-GH"
    },
    {
        "viewValue": "English (Hong Kong)",
        "value":	"en-HK"
    },
    {
        "viewValue": "English (India)",
        "value": "en-IN"
    },
    {
        "viewValue": "English (Ireland)",
        "value": "en-IE"
    },
    {
        "viewValue": "English (Kenya)",
        "value": "en-KE"
    },
    {
        "viewValue": "English (New Zealand)",
        "value":	"en-NZ"
    },
    {
        "viewValue": "English (Nigeria)",
        "value": "en-NG"
    },
    {
        "viewValue": "English (Pakistan)",
        "value": "en-PK"
    },
    {
        "viewValue": "English (Philippines)",
        "value": "en-PH"
    },
    {
        "viewValue": "English (Singapore)",
        "value": "en-SG"
    },
    {
        "viewValue": "English (South Africa)",
        "value":	"en-ZA"
    },
    {
        "viewValue": "English (Tanzania)",
        "value": "en-TZ"
    },
    {
        "viewValue": "English (United Kingdom)",
        "value":	"en-GB"
    },
    {
        "viewValue": "English (United States)",
        "value":	"en-US"
    },
    {
        "viewValue": "Estonian (Estonia)",
        "value": "et-EE"
    },
    {
        "viewValue": "Filipino (Philippines)",
        "value": "fil-PH"
    },
    {
        "viewValue": "Finnish (Finland)",
        "value": "fi-FI"
    },
    {
        "viewValue": "French (Belgium)",
        "value": "fr-BE"
    },
    {
        "viewValue": "French (Canada)",
        "value": "fr-CA"
    },
    {
        "viewValue": "French (France)",
        "value": "fr-FR"
    },
    {
        "viewValue": "French (Switzerland)",
        "value": "fr-CH"
    },
    {
        "viewValue": "Galician (Spain)",
        "value": "gl-ES"
    },
    {
        "viewValue": "Georgian (Georgia)",
        "value": "ka-GE"
    },
    {
        "viewValue": "German (Austria)",
        "value": "de-AT"
    },
    {
        "viewValue": "German (Germany)",
        "value": "de-DE"
    },
    {
        "viewValue": "German (Switzerland)",
        "value": "de-CH"
    },
    {
        "viewValue": "Greek (Greece)",
        "value": "el-GR"
    },
    {
        "viewValue": "Gujarati (India)",
        "value": "gu-IN"
    },
    {
        "viewValue": "Hebrew (Israel)",
        "value": "iw-IL"
    },
    {
        "viewValue": "Hindi (India)",
        "value": "hi-IN"
    },
    {
        "viewValue": "Hungarian (Hungary)",
        "value": "hu-HU"
    },
    {
        "viewValue": "Icelandic (Iceland)",
        "value": "is-IS"
    },
    {
        "viewValue": "Indonesian (Indonesia)",
        "value": "id-ID"
    },
    {
        "viewValue": "Italian (Italy)",
        "value": "it-IT"
    },
    {
        "viewValue": "Italian (Switzerland)",
        "value": "it-CH"
    },
    {
        "viewValue": "Japanese (Japan)",
        "value": "ja-JP"
    },
    {
        "viewValue": "Javanese (Indonesia)",
        "value": "jv-ID"
    },
    {
        "viewValue": "Kannada (India)",
        "value": "kn-IN"
    },
    {
        "viewValue": "Kazakh (Kazakhstan)",
        "value": "kk-KZ"
    },
    {
        "viewValue": "Khmer (Cambodia)",
        "value": "km-KH"
    },
    {
        "viewValue": "Korean (South Korea)",
        "value":	"ko-KR"
    },
    {
        "viewValue": "Lao (Laos)",
        "value": "lo-LA"
    },
    {
        "viewValue": "Latvian (Latvia)",
        "value": "lv-LV"
    },
    {
        "viewValue": "Lithuanian (Lithuania)",
        "value": "lt-LT"
    },
    {
        "viewValue": "Macedonian (North Macedonia)",
        "value":	"mk-MK"
    },
    {
        "viewValue": "Malay (Malaysia)",
        "value": "ms-MY"
    },
    {
        "viewValue": "Malayalam (India)",
        "value": "ml-IN"
    },
    {
        "viewValue": "Marathi (India)",
        "value": "mr-IN"
    },
    {
        "viewValue": "Mongolian (Mongolia)",
        "value": "mn-MN"
    },
    {
        "viewValue": "Nepali (Nepal)",
        "value": "ne-NP"
    },
    {
        "viewValue": "Norwegian Bokmål (Norway)",
        "value": "no-NO"
    },
    {
        "viewValue": "Persian (Iran)",
        "value": "fa-IR"
    },
    {
        "viewValue": "Polish (Poland)",
        "value": "pl-PL"
    },
    {
        "viewValue": "Portuguese (Brazil)",
        "value": "pt-BR"
    },
    {
        "viewValue": "Portuguese (Portugal)",
        "value": "pt-PT"
    },
    {
        "viewValue": "Punjabi (Gurmukhi India)",
        "value":	"pa-Guru-IN"
    },
    {
        "viewValue": "Romanian (Romania)",
        "value": "ro-RO"
    },
    {
        "viewValue": "Russian (Russia)",
        "value": "ru-RU"
    },
    {
        "viewValue": "Serbian (Serbia)",
        "value": "sr-RS"
    },
    {
        "viewValue": "Sinhala (Sri Lanka)",
        "value":	"si-LK"
    },
    {
        "viewValue": "Slovak (Slovakia)",
        "value": "sk-SK"
    },
    {
        "viewValue": "Slovenian (Slovenia)",
        "value": "sl-SI"
    },
    {
        "viewValue": "Spanish (Argentina)",
        "value": "es-AR"
    },
    {
        "viewValue": "Spanish (Bolivia)",
        "value": "es-BO"
    },
    {
        "viewValue": "Spanish (Chile)",
        "value": "es-CL"
    },
    {
        "viewValue": "Spanish (Colombia)",
        "value": "es-CO"
    },
    {
        "viewValue": "Spanish (Costa Rica)",
        "value":	"es-CR"
    },
    {
        "viewValue": "Spanish (Dominican Republic)",
        "value":	"es-DO"
    },
    {
        "viewValue": "Spanish (Ecuador)",
        "value": "es-EC"
    },
    {
        "viewValue": "Spanish (El Salvador)",
        "value":	"es-SV"
    },
    {
        "viewValue": "Spanish (Guatemala)",
        "value": "es-GT"
    },
    {
        "viewValue": "Spanish (Honduras)",
        "value": "es-HN"
    },
    {
        "viewValue": "Spanish (Mexico)",
        "value": "es-MX"
    },
    {
        "viewValue": "Spanish (Nicaragua)",
        "value": "es-NI"
    },
    {
        "viewValue": "Spanish (Panama)",
        "value": "es-PA"
    },
    {
        "viewValue": "Spanish (Paraguay)",
        "value": "es-PY"
    },
    {
        "viewValue": "Spanish (Peru)",
        "value": "es-PE"
    },
    {
        "viewValue": "Spanish (Puerto Rico)",
        "value":	"es-PR"
    },
    {
        "viewValue": "Spanish (Spain)",
        "value": "es-ES"
    },
    {
        "viewValue": "Spanish (United States)",
        "value":	"es-US"
    },
    {
        "viewValue": "Spanish (Uruguay)",
        "value": "es-UY"
    },
    {
        "viewValue": "Spanish (Venezuela)",
        "value": "es-VE"
    },
    {
        "viewValue": "Sundanese (Indonesia)",
        "value": "su-ID"
    },
    {
        "viewValue": "Swahili (Kenya)",
        "value": "sw-KE"
    },
    {
        "viewValue": "Swahili (Tanzania)",
        "value": "sw-TZ"
    },
    {
        "viewValue": "Swedish (Sweden)",
        "value": "sv-SE"
    },
    {
        "viewValue": "Tamil (India)",
        "value": "ta-IN"
    },
    {
        "viewValue": "Tamil (Malaysia)",
        "value": "ta-MY"
    },
    {
        "viewValue": "Tamil (Singapore)",
        "value": "ta-SG"
    },
    {
        "viewValue": "Tamil (Sri Lanka)",
        "value":	"ta-LK"
    },
    {
        "viewValue": "Telugu (India)",
        "value": "te-IN"
    },
    {
        "viewValue": "Thai (Thailand)",
        "value": "th-TH"
    },
    {
        "viewValue": "Turkish (Turkey)",
        "value": "tr-TR"
    },
    {
        "viewValue": "Ukrainian (Ukraine)",
        "value": "uk-UA"
    },
    {
        "viewValue": "Urdu (India)",
        "value": "ur-IN"
    },
    {
        "viewValue": "Urdu (Pakistan)",
        "value": "ur-PK"
    },
    {
        "viewValue": "Uzbek (Uzbekistan)",
        "value": "uz-UZ"
    },
    {
        "viewValue": "Vietnamese (Vietnam)",
        "value": "vi-VN"
    },
    {
        "viewValue": "Zulu (South Africa)",
        "value":	"zu-ZA"
    }
];

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text: string = '';
  public lastText: string = 'Reconocimiento de voz.';
  tempWords: string;
  //Manejar Acciones (Grabando o no)
  service_on = false;
  text_button = 'Iniciar';

  
  constructor() {
      let lang_local = localStorage.getItem("lang_select");
      if (lang_local) {
          this.lang = lang_local;
      }
      else{
          this.lang = configuraciones.language_default;
      }
   }

  changeLang(lang:string){
    this.lang = lang;
    localStorage.setItem("lang_select",this.lang);
  }

  init() {

    
    this.recognition.interimResults = true;
    this.recognition.lang = this.lang;

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