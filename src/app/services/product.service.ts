import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Orders from '../types/product';
import { environment } from 'src/environments/environment';
import Product from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(environment.apiUrl+"products")
  }

    getBrand(brandId:any){
      return this.http.get<Product>(environment.apiUrl+'products/'+brandId)
    }
}
