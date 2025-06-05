import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BagTransferService } from '../services/bag-transfer.service';

@Component({
  selector: 'app-add-bag-transfer',
  templateUrl: './add-bag-transfer.component.html',
  styleUrls: ['./add-bag-transfer.component.scss']
})
export class AddBagTransferComponent implements OnInit {

bagTransfer!: FormGroup;
  headerTitle = "Add Transfer";

  constructor(private fb: FormBuilder, private bagServices: BagTransferService) {}

  ngOnInit(): void {
    this.bagTransfer = this.fb.group({
      id: null,
      transferNo: ["", [Validators.required]],
      transferDate: ["", [Validators.required]],
      fromFactory: [{ value: "Factory A", disabled: false }],
      toFactory: ["", [Validators.required]],
      fromDepartment: ["",[Validators.required]],
      toDepartment: ["", [Validators.required]],
      bagTransferDetailEntityList: this.fb.array([
        this.createBagDetailGroup()
      ])
    });
  }

  createBagDetailGroup(): FormGroup {
    return this.fb.group({
      id: null,
      bagId: [null],
      lotId: [null],
      lotCode: [""],
      stoneSize: [""],
      commodityName: [null],
    });
  }

  get bagDetails(): FormArray {
    return this.bagTransfer.get('bagTransferDetailEntityList') as FormArray;
  }

  // addRow(): void {
  //   this.bagDetails.push(this.createBagDetailGroup());
  // }

  // removeRow(index: number): void {
  //   this.bagDetails.removeAt(index);
  // }

  onSubmit(): void {
    if(this.bagTransfer.valid){
      const payload = this.bagTransfer.getRawValue();
      this.bagServices.createTransfer(payload).subscribe(()=>{
        alert('Transfer added successfuly!')
        this.bagTransfer.reset();
        this.bagDetails.clear();
        this.bagDetails.push(this.createBagDetailGroup());
      })
    }
  }

}
