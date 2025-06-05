import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BagTransferService } from '../services/bag-transfer.service';


@Component({
  selector: 'app-bag-transfer',
  templateUrl: './bag-transfer.component.html',
  styleUrls: ['./bag-transfer.component.scss']
})
export class BagTransferComponent implements OnInit {

  bagTransfer: any[] = [];

  constructor(private bagServices: BagTransferService) { }

  headerTitle = "Transfer"




  ngOnInit(): void {
    this.bagServices.getTransfer().subscribe((res)=>{
      this.bagTransfer = res;
    })

  }



}
