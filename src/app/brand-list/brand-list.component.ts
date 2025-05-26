import { Component, OnInit } from '@angular/core';
import Brand from '../types/brand';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  userForm!: FormGroup;
  users: Brand[] = [];
  //users: any[] = [];
  editUserId: number | null = null;
  isEdit = false;
  addressFormVisible = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // email: ['', [Validators.required, Validators.email]],
      // age: ['', [Validators.required, Validators.min(1)]],
      // address: this.fb.array([])
    });
  }

  // get addressFormArray(): FormArray {
  //   return this.userForm.get('address') as FormArray;
  // }

  // toggleAddressForm() {
  //   this.addressFormVisible = !this.addressFormVisible;
  //   if (this.addressFormVisible && this.addressFormArray.length === 0) {
  //     this.addAddressField();
  //   }
  // }

  // addAddressField() {
  //   const addressGroup = this.fb.group({
  //     street: ['', Validators.required],
  //     city: ['', Validators.required],
  //     zip: ['', Validators.required]
  //   });
  //   this.addressFormArray.push(addressGroup);
  // }

  // removeAddressField(index: number) {
  //   this.addressFormArray.removeAt(index);
  // }

  loadUsers() {
    this.http.get<Brand[]>('http://localhost:3000/brands').subscribe(data => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.value;

    if (!this.addressFormVisible) {
      delete userData.address;
    }

    if (this.isEdit && this.editUserId !== null) {
      this.http.put(`http://localhost:3000/brands/${this.editUserId}`, userData)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
          this.router.navigate(['/brand'])

        });
    } else {
      this.http.post('http://localhost:3000/brands', userData)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
          this.router.navigate(['/brand'])
        });
    }

  }

  onBack(){
    this.router.navigate(['/brand']);
  }

  onEdit(user: Brand) {
    this.isEdit = true;
    this.editUserId = user.id || null;

    this.userForm.patchValue({
      name: user.name,
      // email: user.email,
      // age: user.age
    });

    // const addresses = user.address || [];
    // const addressArray = this.fb.array([]);

    // this.userForm.setControl('address', addressArray);
    // this.addressFormVisible = addresses.length > 0;
  }

  onDelete(id: number) {
    this.http.delete(`http://localhost:3000/brands/${id}`).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.setControl('address', this.fb.array([]));
    this.isEdit = false;
    this.editUserId = null;
    this.addressFormVisible = false;
  }

}
