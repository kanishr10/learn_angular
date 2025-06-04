import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  dataSource: any[] = [];
  products: any[] = [];
  details: any[] = [];
  selectedRow: any = null;
  isDisabled: boolean = true;

  @ViewChild('popup', { static: true }) popup!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Titile: any = "Product List"


  constructor(private productServices: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productServices.getProducts().subscribe((result) => {
      this.products = result;
      this.initTable();
    });
  }

  isDisable(row: any): void {
    this.isDisabled = false;
    this.selectedRow = row;
    this.details = [row]; 
    // console.log(this.details);
    // console.log('Type:', typeof this.dataSource);
  }

  isClose(): void {
    this.isDisabled = true;
    this.selectedRow = null;
  }

  initTable(): void {
    this.dataSource = this.products; // this.products should be an array of Product
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource = this.products.filter(product =>
      product.invoice.toLowerCase().includes(filterValue) ||
      product.reference.toLowerCase().includes(filterValue)
    );
  }
}
