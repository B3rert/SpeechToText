import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_API } from 'src/app/service/apihost.service';

@Injectable({
  providedIn: 'root'
})
export class PrintService {


  private url: string;

  constructor(private _http: HttpClient) {
    this.url = URL_API.api_url.url;
  }

  postPrintText( settings:any){

    let params = JSON.stringify(settings);
    
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this._http.post(this.url + "Print/generate",params,{headers: headers}); 
  }

  getPrinters(){
    let headers = new HttpHeaders({"Content-Type": "application/json"});
    return this._http.get(this.url + "Print",{headers: headers}); 
  }


  getConnection(){
    let headers = new HttpHeaders({"Content-Type": "application/json"});
    return this._http.get(this.url + "Print/connection",{headers: headers}); 
  }

}
