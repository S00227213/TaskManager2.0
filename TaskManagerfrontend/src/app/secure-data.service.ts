import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecureDataService {
  private apiUrl = '/api/secure-data'; 

  constructor(private http: HttpClient) {}

  getSecureData(jwtToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
