import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BagTransferService {

  private baseUrl = 'http://localhost:3000/bagTransfers';

  constructor(private http: HttpClient) { }

  createTransfer(data: any){
    return this.http.post<any>(this.baseUrl,data);
  }

  getTransfer(){
    return this.http.get<any>(this.baseUrl)
  }

  deleteTransfer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
