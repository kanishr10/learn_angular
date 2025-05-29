import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import Brand from '../../types/brand';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  brands: Brand[] = [];
  customerFilterForm!: FormGroup;
  lot = ['10','20','30','40','50','60'];
  size = ['2','4','6','8','10','12'];
  operatorList = ['Equals', 'Not Equals', 'Contains', 'Greater Than', 'Less Than'];


  constructor(
    private http: HttpClient,
    private brandService: BrandService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.customerFilterForm = this.fb.group({
      configModuleId: [null, Validators.required],
      description: [''],
      customFilterDetailList: this.fb.array([]),
    });
  }


  onSubmit() {
  if (this.customerFilterForm.invalid) {
    this.customerFilterForm.markAllAsTouched();
    console.log('Form Invalid:', this.customerFilterForm.value);
    return;
  }

  const formValue = this.customerFilterForm.value;

  // You can format or clean data here if needed

  console.log('Submitting Filter Data:', formValue);

  // Example API call (inject HttpClient and Router)
  this.http.post('http://localhost:3000/products', formValue).subscribe({
    next: (res) => {
      console.log('Filters saved successfully', res);
      this.router.navigate(['/product']);
    },
    error: (err) => {
      console.error('Error saving filters', err);
    }
  });
}


  get customFilterDetailList(): FormArray {
    return this.customerFilterForm.get('customFilterDetailList') as FormArray;
  }

  createCondition(): FormGroup {
    return this.fb.group({
      id: [null],
      field: [null, Validators.required],
      operator: [null, Validators.required],
      value: [''],
      startValue: [''],  // for range conditions
      endValue: [''],    // for range conditions
      inputType: ['Text'], // optional to track input type
    });
  }

  createFilterGroup(): FormGroup {
    return this.fb.group({
      filterName: ['', Validators.required],
      conditions: this.fb.array([this.createCondition()]),
    });
  }

  addFilter() {
    this.customFilterDetailList.push(this.createFilterGroup());
  }

  getConditions(index: number): FormArray {
    return this.customFilterDetailList.at(index).get('conditions') as FormArray;
  }

  addCondition(filterIndex: number) {
    this.getConditions(filterIndex).push(this.createCondition());
  }

  removeCondition(filterIndex: number, conditionIndex: number) {
    this.getConditions(filterIndex).removeAt(conditionIndex);
  }

  removeFilter(filterIndex: number) {
    this.customFilterDetailList.removeAt(filterIndex);
  }

}
