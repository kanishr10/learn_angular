import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BagTransferService } from '../services/bag-transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupBagTransferComponent } from '../popup-bag-transfer/popup-bag-transfer.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-add-bag-transfer',
  templateUrl: './add-bag-transfer.component.html',
  styleUrls: ['./add-bag-transfer.component.scss']
})
export class AddBagTransferComponent implements OnInit {

  bagTransfer!: FormGroup;
  bagTransferNewRows!: FormGroup;
  headerTitle = "Add Transfer Form";
  showBagDetails: boolean = false;
  selectedRows: any[] = [];
  details: any[] = [];
  // newRows: any[] = [];

  constructor(private fb: FormBuilder, private bagServices: BagTransferService, private dialogRef: MatDialog) { }

  ngOnInit(): void {
    this.bagTransfer = this.fb.group({
      id: "",
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
    this.bagTransferNewRows = this.fb.group({
      id:"",
      bagId: [''],
      lotId: ['null'],
      lotCode: [""],
      stoneSize: [""],
      commodityName: ['null'],

    })
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

createLotTable() {
  const newGroup = this.fb.group({
    id: null,
    bagId: [''],
    lotId: [''],
    lotCode: [''],
    stoneSize: [''],
    commodityName: ['']
  });

  this.bagDetails.push(newGroup);
}


  get bagDetails(): FormArray {
    return this.bagTransfer.get<any>('bagTransferDetailEntityList') as FormArray;
  }

  addRow(): void {
    this.bagDetails.push(this.createBagDetailGroup());
  }

  removeRow(index: any): void {
    this.bagDetails.removeAt(index);

  }

onSubmit(): void {
  if (this.bagTransfer.valid) {
    const payload = this.bagTransfer.getRawValue(); // includes all FormArray data
    this.bagServices.createTransfer(payload).subscribe(() => {
      alert('Transfer added successfully!');
      this.bagTransfer.reset();
      this.bagDetails.clear();
      this.bagDetails.push(this.createBagDetailGroup());
    });
  }
}

onSubmitNewRows(){
  console.log(this.bagTransferNewRows)
}


  onDialog() {
    const dialogRef = this.dialogRef.open(PopupBagTransferComponent, {
      width: '800px',
      height:'400px',
      data: {}
    });

    dialogRef.componentInstance.transferSelected.subscribe((rows: any[]) => {
      if (rows) {
        this.onTransferSelected(rows);
        console.log(rows)
      }
    });
  }


  onTransferSelected(rows: any[]) {
    this.selectedRows = rows;
    // console.log('Selected Rows from popup:', this.selectedRows);
  }

  viewChildTable(row: any): void {
    this.details = [row]
  }

  isDeleteRow(row: any): void {
    if (this.selectedRows.indexOf(row) > -1) {
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    }
  }

  isDeleteLotRow(row: any){
    
    if(this.details.indexOf(row) > -1){
      this.details.splice(this.details.indexOf(row), 1)
    }
  }

  // isDeleteLotNewRow(row:any){
  //   if(this.newRows.indexOf(row) > -1){
  //     this.newRows.splice(this.newRows.indexOf(row), 1)
  //   }
  // }

}
