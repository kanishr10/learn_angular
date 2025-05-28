import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import Brand from '../../types/brand';
import { BrandService } from '../../services/brand.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-brand',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  constructor(private brandService: BrandService) { }

  @ViewChild(MatPaginator) pagination!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.brandService.getBrands().subscribe((brands) => {
      this.initTable(brands)
    })
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
