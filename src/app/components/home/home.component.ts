import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // constructor() { }

  // ngOnInit(): void {
  // }

  totalOrders: number = 100;
  totalProducts: number = 50;
  totalBrands: number = 10;

}
