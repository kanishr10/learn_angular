import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Product from '../types/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  dataSource!: MatTableDataSource<Product>;
  products: Product[] = [];

  displayedColumns = [
    'productName',
    'productDetail',
    'brandId',
    'purchasePrice',
    'salePrice',
    'availableQty',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productServices: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.productServices.getProducts().subscribe((result) => {
      this.products = result;
      this.initTable();
    });
  }

  // ngAfterViewInit(): void {
  //   if (this.dataSource) {
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   }
  // }

  initTable(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
