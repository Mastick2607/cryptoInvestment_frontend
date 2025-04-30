import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
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

   getCrytoById(id:string):Observable<any>{
      return this.http.get<any>(`${this.endpoint}${this.apiUrl}/${id}`);
    }

    getPriceHistory(cryptoId: string, from: string, to: string): Observable<any> {
      const params = new HttpParams()
        .set('from', from)
        .set('to', to);
  
      return this.http.get(`${this.endpoint}${this.apiUrl}/${cryptoId}/price-history`, { params });
    }
  
}
