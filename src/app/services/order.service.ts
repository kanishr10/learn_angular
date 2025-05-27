import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Orders from '../types/order';
import { environment } from 'src/environments/environment';
import Product from '../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"products")
  }

    getBrand(brandId:any){
      return this.http.get<Product>(environment.apiUrl+'products/'+brandId)
    }
}
