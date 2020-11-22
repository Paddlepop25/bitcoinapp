import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BitcoinService {
  constructor(private http: HttpClient) { }
      
  getBitcoinRate(): Promise<any> {
    const endpoint = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCSGD'
    const apikey = 'OTNmYTIyOTMzZGVhNDRkNDhkYjYyOGUzYTRiNTc2NDM'
    const headers = new HttpHeaders().set('x-ba-key', apikey)
    return this.http.get(endpoint, { headers: headers }).toPromise()
  }
}