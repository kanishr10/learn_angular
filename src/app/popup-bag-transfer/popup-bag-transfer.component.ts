import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BagTransferService } from '../services/bag-transfer.service';

@Component({
  selector: 'app-popup-bag-transfer',
  templateUrl: './popup-bag-transfer.component.html',
  styleUrls: ['./popup-bag-transfer.component.scss']
})
export class PopupBagTransferComponent implements OnInit {

  bagTransfer: any[] = [];
  bagTransferUpload: any[] = [];

  constructor(private bagServices: BagTransferService) { }


  ngOnInit(): void {
    this.bagServices.getTransfer().subscribe((res)=>{
      this.bagTransfer = res;
    })
  }



  @Output() transferSelected = new EventEmitter<any[]>();

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
