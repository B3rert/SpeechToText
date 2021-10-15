import { Injectable } from '@angular/core';
import { LanguageGroup } from '../interfaces/languages.interface';

//webkit api Google
declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  languages: LanguageGroup[] = [
    {
        "name": "Afrikaans",
        "language": [
            {
                "viewValue": "South Africa",
                "value": "af-ZA"
            }
        ]
    },
    {
        "name": "Arabic",
        "language": [
            {
                "viewValue": "Algeria",
                "value": "ar-DZ"
            },
            {
                "viewValue": "Bahrain",
                "value": "ar-BH"
            },
            {
                "viewValue": "Egypt",
                "value": "ar-EG"
            },
            {
                "viewValue": "Israel",
                "value": "ar-IL"
            },
            {
                "viewValue": "Iraq",
                "value": "ar-IQ"
            },
            {
                "viewValue": "Jordan",
                "value": "ar-JO"
            },
            {
                "viewValue": "Kuwait",
                "value": "ar-KW"
            },
            {
                "viewValue": "Lebanon",
                "value": "ar-LB"
            },
            {
                "viewValue": "Morocco",
                "value": "ar-MA"
            },
            {
                "viewValue": "Oman",
                "value": "ar-OM"
            },
            {
                "viewValue": "Palestinian Territory",
                "value": "ar-PS"
            },
            {
                "viewValue": "Qatar",
                "value": "ar-QA"
            },
            {
                "viewValue": "Saudi Arabia",
                "value": "ar-SA"
            },
            {
                "viewValue": "Tunisia",
                "value": "ar-TN"
            },
            {
                "viewValue": "UAE",
                "value": "ar-AE"
            }
        ]
    },
    {
        "name": "Basque",
        "language": [
            {
                "viewValue": "Spain",
                "value": "eu-ES"
            }
        ]
    },
    {
        "name": "Bulgarian",
        "language": [
            {
                "viewValue": "Bulgaria",
                "value": "bg-BG"
            }
        ]
    },
    {
        "name": "Catalan",
        "language": [
            {
                "viewValue": "Spain",
                "value": "ca-ES"
            }
        ]
    },
    {
        "name": "Chinese Mandarin",
        "language": [
            {
                "viewValue": "China (Simp.)",
                "value": "cmn-Hans-CN"
            },
            {
                "viewValue": "Hong Kong SAR (Trad.)",
                "value": "cmn-Hans-HK"
            },
            {
                "viewValue": "Taiwan (Trad.)",
                "value": "cmn-Hant-TW"
            }
        ]
    },
    {
        "name": "Chinese Cantonese",
        "language": [
            {
                "viewValue": "Hong Kong",
                "value": "yue-Hant-HK"
            }
        ]
    },
    {
        "name": "Croatian",
        "language": [
            {
                "viewValue": "Croatia",
                "value": "hr_HR"
            }
        ]
    },
    {
        "name": "Czech",
        "language": [
            {
                "viewValue": "Czech Republic",
                "value": "cs-CZ"
            }
        ]
    },
    {
        "name": "Danish",
        "language": [
            {
                "viewValue": "Denmark",
                "value": "da-DK"
            }
        ]
    },
    {
        "name": "English",
        "language": [
            {
                "viewValue": "Australia",
                "value": "en-AU"
            },
            {
                "viewValue": "Canada",
                "value": "en-CA"
            },
            {
                "viewValue": "India",
                "value": "en-IN"
            },
            {
                "viewValue": "Ireland",
                "value": "en-IE"
            },
            {
                "viewValue": "New Zealand",
                "value": "en-NZ"
            },
            {
                "viewValue": "Philippines",
                "value": "en-PH"
            },
            {
                "viewValue": "South Africa",
                "value": "en-ZA"
            },
            {
                "viewValue": "United Kingdom",
                "value": "en-GB"
            },
            {
                "viewValue": "United States",
                "value": "en-US"
            }
        ]
    },
    {
        "name": "Farsi",
        "language": [
            {
                "viewValue": "Iran",
                "value": "fa-IR"
            }
        ]
    },
    {
        "name": "French",
        "language": [
            {
                "viewValue": "France",
                "value": "fr-FR"
            }
        ]
    },
    {
        "name": "Filipino",
        "language": [
            {
                "viewValue": "Philippines",
                "value": "fil-PH"
            }
        ]
    },
    {
        "name": "Galician",
        "language": [
            {
                "viewValue": "Spain",
                "value": "gl-ES"
            }
        ]
    },
    {
        "name": "German",
        "language": [
            {
                "viewValue": "Germany",
                "value": "de-DE"
            }
        ]
    },
    {
        "name": "Greek",
        "language": [
            {
                "viewValue": "Greece",
                "value": "el-GR"
            }
        ]
    },
    {
        "name": "Finnish",
        "language": [
            {
                "viewValue": "Finland",
                "value": "fi-FI"
            }
        ]
    },
    {
        "name": "Hebrew",
        "language": [
            {
                "viewValue": "Israel",
                "value": "he-IL"
            }
        ]
    },
    {
        "name": "Hindi",
        "language": [
            {
                "viewValue": "India",
                "value": "hi-IN"
            }
        ]
    },
    {
        "name": "Hungarian",
        "language": [
            {
                "viewValue": "Hungary",
                "value": "hu-HU"
            }
        ]
    },
    {
        "name": "Indonesian",
        "language": [
            {
                "viewValue": "Indonesia",
                "value": "id-ID"
            }
        ]
    },
    {
        "name": "Icelandic",
        "language": [
            {
                "viewValue": "Iceland",
                "value": "is-IS"
            }
        ]
    },
    {
        "name": "Italian",
        "language": [
            {
                "viewValue": "Italy",
                "value": "it-IT"
            },
            {
                "viewValue": "Switzerland",
                "value": "it-CH"
            }
        ]
    },
    {
        "name": "Japanese",
        "language": [
            {
                "viewValue": "Japan",
                "value": "ja-JP"
            }
        ]
    },
    {
        "name": "Korean",
        "language": [
            {
                "viewValue": "Korea",
                "value": "ko-KR"
            }
        ]
    },
    {
        "name": "Lithuanian",
        "language": [
            {
                "viewValue": "Lithuania",
                "value": "lt-LT"
            }
        ]
    },
    {
        "name": "Malaysian",
        "language": [
            {
                "viewValue": "Malaysia",
                "value": "ms-MY"
            }
        ]
    },
    {
        "name": "Dutch",
        "language": [
            {
                "viewValue": "Netherlands",
                "value": "nl-NL"
            }
        ]
    },
    {
        "name": "Norwegian",
        "language": [
            {
                "viewValue": "Norway",
                "value": "nb-NO"
            }
        ]
    },
    {
        "name": "Polish",
        "language": [
            {
                "viewValue": "Poland",
                "value": "pl-PL"
            }
        ]
    },
    {
        "name": "Portuguese",
        "language": [
            {
                "viewValue": "Brazil",
                "value": "pt-BR"
            },
            {
                "viewValue": "Portugal",
                "value": "pt-PT"
            }
        ]
    },
    {
        "name": "Romanian",
        "language": [
            {
                "viewValue": "Romania",
                "value": "ro-RO"
            }
        ]
    },
    {
        "name": "Russian",
        "language": [
            {
                "viewValue": "Russia",
                "value": "ru-RU"
            }
        ]
    },
    {
        "name": "Serbian",
        "language": [
            {
                "viewValue": "Serbia",
                "value": "sr-RS"
            }
        ]
    },
    {
        "name": "Slovak",
        "language": [
            {
                "viewValue": "Slovakia",
                "value": "sk-SK"
            }
        ]
    },
    {
        "name": "Slovenian",
        "language": [
            {
                "viewValue": "Slovenia",
                "value": "sl-SI"
            }
        ]
    },
    {
        "name": "Spanish",
        "language": [
            {
                "viewValue": "Argentina",
                "value": "es-AR"
            },
            {
                "viewValue": "Bolivia",
                "value": "es-BO"
            },
            {
                "viewValue": "Chile",
                "value": "es-CL"
            },
            {
                "viewValue": "Colombia",
                "value": "es-CO"
            },
            {
                "viewValue": "Costa Rica",
                "value": "es-CR"
            },
            {
                "viewValue": "Dominican Republic",
                "value": "es-DO"
            },
            {
                "viewValue": "Ecuador",
                "value": "es-EC"
            },
            {
                "viewValue": "El Salvador",
                "value": "es-SV"
            },
            {
                "viewValue": "Guatemala",
                "value": "es-GT"
            },
            {
                "viewValue": "Honduras",
                "value": "es-HN"
            },
            {
                "viewValue": "México",
                "value": "es-MX"
            },
            {
                "viewValue": "Nicaragua",
                "value": "es-NI"
            },
            {
                "viewValue": "Panamá",
                "value": "es-PA"
            },
            {
                "viewValue": "Paraguay",
                "value": "es-PY"
            },
            {
                "viewValue": "Perú",
                "value": "es-PE"
            },
            {
                "viewValue": "Puerto Rico",
                "value": "es-PR"
            },
            {
                "viewValue": "Spain",
                "value": "es-ES"
            },
            {
                "viewValue": "Uruguay",
                "value": "es-UY"
            },
            {
                "viewValue": "United States",
                "value": "es-US"
            },
            {
                "viewValue": "Venezuela",
                "value": "es-VE"
            }
        ]
    },
    {
        "name": "Swedish",
        "language": [
            {
                "viewValue": "Sweden",
                "value": "sv-SE"
            }
        ]
    },
    {
        "name": "Thai",
        "language": [
            {
                "viewValue": "Thailand",
                "value": "th-TH"
            }
        ]
    },
    {
        "name": "Turkish",
        "language": [
            {
                "viewValue": "Turkey",
                "value": "tr-TR"
            }
        ]
    },
    {
        "name": "Ukrainian",
        "language": [
            {
                "viewValue": "Ukraine",
                "value": "uk-UA"
            }
        ]
    },
    {
        "name": "Vietnamese",
        "language": [
            {
                "viewValue": "Viet Nam",
                "value": "vi-VN"
            }
        ]
    },
    {
        "name": "Zulu",
        "language": [
            {
                "viewValue": "South Africa",
                "value": "zu-ZA"
            }
        ]
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