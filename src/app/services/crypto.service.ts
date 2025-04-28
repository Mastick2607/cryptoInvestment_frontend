import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroments/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private endpoint:string;
  private apiUrl: string;
  constructor(  private http: HttpClient
  ) { 
    this.endpoint = enviroment.url_api;
    this.apiUrl = 'cryptos';
  }

  getCryto(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}${this.apiUrl}`);
  }
}
