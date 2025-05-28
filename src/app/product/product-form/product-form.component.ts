import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Product from '../../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
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

  constructor(private productServices: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productServices.getProducts().subscribe((result) => {
      this.products = result;
      this.initTable();
    });
  }

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
