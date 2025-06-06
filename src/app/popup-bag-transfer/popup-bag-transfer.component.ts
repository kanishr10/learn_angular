import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BagTransferService } from '../services/bag-transfer.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-bag-transfer',
  templateUrl: './popup-bag-transfer.component.html',
  styleUrls: ['./popup-bag-transfer.component.scss']
})
export class PopupBagTransferComponent implements OnInit {

  bagTransfer: any[] = [];
  bagTransferUpload: any[] = [];

  constructor(private bagServices: BagTransferService, private dialogRef: MatDialogRef<PopupBagTransferComponent>) { }


  ngOnInit(): void {
    this.bagServices.getTransfer().subscribe((res)=>{
      this.bagTransfer = res;
    })
  }



  @Output() transferSelected = new EventEmitter<any[]>();

  addSelectedToUpload() {
    this.sendDataToParent();
  this.dialogRef.close(this.bagTransferUpload);  // Send data back to parent
}


  onCheckboxChange(event: any, row: any) {
    if (event.target.checked) {
      this.bagTransferUpload.push(row);
    } else {
      this.bagTransferUpload = this.bagTransferUpload.filter(item => item !== row);
    }
  }


  sendDataToParent() {
    this.transferSelected.emit(this.bagTransferUpload);
  }
}
