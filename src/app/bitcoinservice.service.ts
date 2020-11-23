import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BitcoinService {
  constructor(private http: HttpClient) { }
      
  async getBitcoinRate(): Promise<any> {
    // request from localhost:3000 (express) which is requesting from https://apiv2.bitcoinaverage.com
    return await this.http.get<any>('http://localhost:3000/bitcoinaverage').toPromise()
  }
}