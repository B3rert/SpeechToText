import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUser } from '../interfaces/data_user.interface';
import { URL_API } from './apihost.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private url: string;

  constructor(private _http: HttpClient) {
    this.url = URL_API.api_url.url_license;
  }

  postLicense(cuenta: DataUser) {
    let params = JSON.stringify(cuenta);
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this._http.post(this.url + "CuentaCorrentista", params, { headers: headers });
  }
}
