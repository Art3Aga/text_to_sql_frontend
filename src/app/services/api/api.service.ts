import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  translateToSql(text: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/tuning`, { query: text }, { headers });
  }


  executeQuery(query: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/execute`, { query: query }, { headers });
  }

}
