import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodsService {
  private http = inject(HttpClient);

  getMethod<T>(url: string, headers?: { [key: string]: string }): Observable<T> {
    return this.http.get<T>(url, { headers });
  }

  putMethod<T, U>(url: string, changedData: U, headers?: HttpHeaders): Observable<T> {
  return this.http.put<T>(url, changedData, { headers });
}

postMethod<T, U>(url: string, dataSent: U, headers?: HttpHeaders): Observable<T> {
  return this.http.post<T>(url, dataSent, { headers });
}

  deleteMethod<T>(url: string, dataSent?: T, headers?: { [key: string]: string }): Observable<T> {
    return this.http.delete<T>(url, { body: dataSent, headers });
  }
}