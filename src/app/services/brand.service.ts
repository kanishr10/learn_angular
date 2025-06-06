import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Brand from '../types/brand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(){
    return this.http.get<Brand[]>("http://localhost:3000/brands")
  }

//   getBrand(id: number) {
//   return this.http.get<Brand>(`http://localhost:3000/brands/${id}`);
// }

  getBrand(brandId:string){
    return this.http.get<Brand>('http://localhost:3000/brands/'+brandId)
  }
}
