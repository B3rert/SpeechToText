import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from './apihost.service';
import { ParamsLicense } from '../interfaces/params-license.interface';

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private url: string;

  constructor(private _http: HttpClient) {
    this.url = URL_API.api_url.url_license;
  }

  getLicense(license: string) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http.get(this.url + "License/" + license, { headers: headers });
  }

  postLicense(license: ParamsLicense) {
    let params = JSON.stringify(license);
    
    let headers = new HttpHeaders({"Content-Type": "application/json"});

    return this._http.post(this.url + "License",params,{headers: headers}); 
  }

}
