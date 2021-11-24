declare var configuraciones: any;

let url = configuraciones.urlApis;
export const URL_API = {
    api_url: {
        //url: "http://localhost:5000/api/", //Alojamineto de apis 
      // url: url, //Alojamineto de apis 
        url: "https://localhost:44324/api/", //Alojamineto de apis (Impresión)
        url_license:"https://localhost:44345/api/" //Alojamineto de apis (lisenciamiento y autenticación)
    }
}