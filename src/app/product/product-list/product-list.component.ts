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
export class ProductListComponent implements OnInit {

  brands: Brand[] = [];
  customerFilterForm!: FormGroup;
  invoiceNo = ['10', '20', '30', '40', '50', '60'];
  size = ['2', '4', '6', '8', '10', '12'];
  isEdit!: any;
  editUserId!: any;

  Title = "Product Form"



  constructor(
    private http: HttpClient,
    private brandService: BrandService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.customerFilterForm = this.fb.group({
      invoice: [null, Validators.required],
      date: ['', Validators.required],
      reference: [''],
      customFilterDetailList: this.fb.array([]),
    });

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEdit = true;
      this.editUserId = +id;

      this.productService.getBrand(id).subscribe((result) => {

        this.customerFilterForm.patchValue({
          invoice: result.invoice,
          date: result.date,
          reference: result.reference,
        });

        this.customFilterDetailList.clear();

        result.customFilterDetailList.forEach((filter: any) => {
          const filterGroup = this.fb.group({
            filterName: [filter.filterName, Validators.required],
            conditions: this.fb.array([]),
          });

          filter.conditions.forEach((cond: any) => {
            const conditionGroup = this.fb.group({
              size: [cond.size, Validators.required],
              qty: [cond.qty, Validators.required],
              rate: [cond.rate, Validators.required],
              amount: [{ value: cond.amount, disabled: true }],
            });

            conditionGroup.get('qty')!.valueChanges.subscribe(() => this.updateAmount(conditionGroup));
            conditionGroup.get('rate')!.valueChanges.subscribe(() => this.updateAmount(conditionGroup));

            (filterGroup.get('conditions') as FormArray).push(conditionGroup);
          });

          this.customFilterDetailList.push(filterGroup);
        });

        console.log('Editing brand:', result);
      });
    }

  }


  onSubmit() {
    if (this.customerFilterForm.invalid) {
      this.customerFilterForm.markAllAsTouched();
      console.log('Form Invalid:', this.customerFilterForm.value);
      return;
    }

    const formValue = this.customerFilterForm.value;


    console.log('Submitting Filter Data:', formValue);

    if (this.isEdit && this.editUserId !== null) {
      console.log("1")
      this.http.put(`http://localhost:3000/products/${this.editUserId}`, formValue)
        .subscribe(() => {
          this.router.navigate(['/product'])
        });
    } else {

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
  }


  get customFilterDetailList(): FormArray {
    return this.customerFilterForm.get('customFilterDetailList') as FormArray;
  }

  createCondition(): FormGroup {
    const group = this.fb.group({
      id: [null],
      size: [null, Validators.required],
      qty: [null, Validators.required],
      rate: [null, Validators.required],
      amount: [{ value: null, disabled: false }],
    });

    group.get('qty')!.valueChanges.subscribe(() => this.updateAmount(group));
    group.get('rate')!.valueChanges.subscribe(() => this.updateAmount(group));

    return group;
  }


  updateAmount(group: FormGroup): void {
    const qty = +group.get('qty')!.value;
    const rate = +group.get('rate')!.value;
    const amount = qty && rate ? qty * rate : null;
    group.get('amount')!.setValue(amount, { emitEvent: false });
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

  // addCondition(filterIndex: number) {
  // const conditions = this.getConditions(filterIndex);
  // conditions.push(this.createCondition());
  // }

  removeCondition(filterIndex: number, conditionIndex: number) {
    this.getConditions(filterIndex).removeAt(conditionIndex);
  }

  removeFilter(filterIndex: number) {
    this.customFilterDetailList.removeAt(filterIndex);
  }

  onBack() {
    this.router.navigate(['/product']);
  }

} 