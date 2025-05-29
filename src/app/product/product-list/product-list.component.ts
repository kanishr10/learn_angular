import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import Brand from '../../types/brand';
import { BrandService } from '../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  brands: Brand[] = [];
  productForm!: FormGroup;
  editUserId: number | null = null;

  lot = ['10','20','30','40','50','60'];
  size = ['2','4','6','8','10','12'];

  constructor(private http: HttpClient, private brandService: BrandService, private ProductService: ProductService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }


  ngOnInit() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data;
      console.log(this.brands);
    })
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDetail: [''],
      // selectedOption: ['', Validators.required],
      brandId: ['', Validators.required],
      features: this.fb.array([]),
      purchasePrice: [],
      salePrice: [],
      availableQty: []
    });


    this.addFeature();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editUserId = +id; // 👈 ensure number

      this.ProductService.getBrand(this.editUserId).subscribe((result) => {
        this.productForm.patchValue({
          productName: result.productName,
          productDetail: result.productDetail,
          brandId: result.brandId,
          purchasePrice: result.purchasePrice,
          salePrice: result.salePrice,
          availableQty: result.availableQty
        });

        this.features.clear();
        result.features.forEach((feature: any) => {
          const featureGroup = this.fb.group({
            bagNo: [feature.bagNo],
            lotCode: [feature.lotCode],
            size: [feature.size],
            weight: [feature.weight],
            selectedOption1: [feature.selectedOption1],
            selectedOption2: [feature.selectedOption2],
          });
          this.features.push(featureGroup);
        });

        console.log('Editing Product:', result);
      });
    }



  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray;
  }

  onSubmit() {
    console.log("Work 1")
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    console.log('Submitting:', this.productForm.value);

    this.addProduct();
  }


  addFeature() {
    const featureGroup = this.fb.group({
      bagNo: [''],
      lotCode: [''],
      size: [''],
      weight: [''],
      selectedOption: [''],
    });
    this.features.push(featureGroup);
  }


  addProduct() {

    if (this.editUserId && !isNaN(this.editUserId)) {
      this.http.put(`http://localhost:3000/products/${this.editUserId}`, this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/product'])
          console.log("1")
        });
    } else {
      this.http.post('http://localhost:3000/products/', this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/product'])
          console.log("2")

        });
    }
  }

  removeFeature(i: number) {
    this.features.removeAt(i);
  }
}
