import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Orders from '../types/product';
import { environment } from 'src/environments/environment';
import Product from '../types/product';
import Brand from '../types/brand';

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
