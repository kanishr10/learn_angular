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
    return this.http.get<Brand[]>(environment.apiUrl+"brands")
  }
}
