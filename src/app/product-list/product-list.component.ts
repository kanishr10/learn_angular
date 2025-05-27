import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Brand from '../types/brand';
import { BrandService } from '../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  brands: Brand[] = [];
  productForm!: FormGroup;
  editUserId: number | null = null;

  constructor(private http: HttpClient, private brandService: BrandService, private ProductService: OrderService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }


  ngOnInit() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
      console.log(this.brands);
    })

    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDetail: [''],
      brandId: ['', Validators.required],
      features: this.fb.array([
        this.fb.group({
          bagNo: [''],
          lotCode: [''],
          size: [''],
          weight: [''],
        })
      ]),
      purchasePrice: [],
      salePrice: [],
      availableQty: []
    });

    this.addFeature();

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.editUserId = +id;
      this.ProductService.getBrand(id).subscribe((result) => {
        this.productForm.patchValue(result);
        console.log('Editing Product:', result);
      });
    }
  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray;
  }

  onSubmit() {
    // this.addProduct();
    // this.ngOnInit();
    // this.router.navigate(['/product'])
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.addProduct();
  }

  addFeature() {
    const featureGroup = this.fb.group({
      name: ['']
    })
    this.features.push(featureGroup);
  }

  addProduct() {
    // console.log(this.productForm.value)
    // this.http.post('http://localhost:3000/products', this.productForm.value)
    //     .subscribe(() => {
    //       // this.loadUsers();
    //       // this.resetForm();
    //       this.productForm.reset();
    //       this.features.clear();
    //       this.router.navigate(['/product'])
    //     });

    if (this.editUserId !== null) {
      this.http.put(`http://localhost:3000/products/${this.editUserId}`, this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/product'])

        });
    } else {
      this.http.post('http://localhost:3000/products', this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/product'])
        });
    }
  }

  removeFeature(i: number) {
    this.features.removeAt(i);
  }
}
