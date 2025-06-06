import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BagTransferService } from '../services/bag-transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupBagTransferComponent } from '../popup-bag-transfer/popup-bag-transfer.component';

@Component({
  selector: 'app-add-bag-transfer',
  templateUrl: './add-bag-transfer.component.html',
  styleUrls: ['./add-bag-transfer.component.scss']
})
export class AddBagTransferComponent implements OnInit {

  bagTransfer!: FormGroup;
  headerTitle = "Add Transfer Form";
  showBagDetails: boolean = false;
  selectedRows: any[] = [];
  details: any[] = [];

  constructor(private fb: FormBuilder, private bagServices: BagTransferService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.bagTransfer = this.fb.group({
      id: null,
      transferNo: ["", [Validators.required]],
      transferDate: ["", [Validators.required]],
      fromFactory: [{ value: "Factory A", disabled: false }],
      toFactory: ["", [Validators.required]],
      fromDepartment: ["", [Validators.required]],
      toDepartment: ["", [Validators.required]],
      Select: [false],
      bagTransferDetailEntityList: this.fb.array([
        this.createBagDetailGroup()
      ])
    });
    // console.log(this.selectedRows);
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
    return this.bagTransfer.get<any>('bagTransferDetailEntityList') as FormArray;
  }

  addRow(): void {
    this.bagDetails.push(this.createBagDetailGroup());
  }

  removeRow(index: number): void {
    this.bagDetails.removeAt(index);
  }

  onSubmit(): void {
    if (this.bagTransfer.valid) {
      const payload = this.bagTransfer.getRawValue();
      this.bagServices.createTransfer(payload).subscribe(() => {
        alert('Transfer added successfuly!')
        this.bagTransfer.reset();
        this.bagDetails.clear();
        this.bagDetails.push(this.createBagDetailGroup());
      })
    }
  }

  onDialog() {
    const dialogRef = this.dialogRef.open(PopupBagTransferComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.componentInstance.transferSelected.subscribe((rows: any[]) => {
      if (rows) {
        this.onTransferSelected(rows);
      }
    });
  }


  onTransferSelected(rows: any[]) {
    this.selectedRows = rows;
    console.log('Selected Rows from popup:', this.selectedRows);
  }

  viewChildTable(row: any): void {
    this.details = [row]
  }

  isDeleteRow() {

  }

}
