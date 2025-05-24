import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Orders from '../types/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getBrands(){
    return this.http.get<Orders[]>(environment.apiUrl+"orders")
  }
}
