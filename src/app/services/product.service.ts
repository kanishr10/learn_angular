import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Product from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/products/")
  }

    getBrand(brandId:string){
      return this.http.get<Product>('http://localhost:3000/products/'+brandId)
    }
}
