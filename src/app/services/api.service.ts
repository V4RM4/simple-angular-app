import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getFacts(): Observable<{ data: { fact: string; length: number }[] }> {
    return this.http.get<{ data: { fact: string; length: number }[] }>(
      'https://catfact.ninja/facts?limit=10'
    );
  }
}


