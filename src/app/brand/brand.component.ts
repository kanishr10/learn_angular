import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Brand from '../types/brand';
import { BrandService } from '../services/brand.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  constructor(private brandService: BrandService) { }

  @ViewChild(MatPaginator) pagination!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.brandService.getBrands().subscribe((brands) => {
      this.initTable(brands)
    })
  }

  // initTable(data: Brand[]) {
  //   this.dataSource = new MatTableDataSource(data) // this is my loigc any error to refer the youtue vidoe
  //   this.dataSource.paginator = this.pagination;
  //   this.dataSource.sort = this.sort;
  // }

  initTable(data: Brand[]) {
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.pagination;
  this.dataSource.sort = this.sort;

  this.dataSource.filterPredicate = (data: Brand, filter: string) => {
    return data.name.toLowerCase().includes(filter);
  };
}

  
  displayedColumns: string[] = ['name', 'action',]
  dataSource!: MatTableDataSource<Brand>

  // Table filter function 
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  //   if(this.dataSource.paginator){
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
