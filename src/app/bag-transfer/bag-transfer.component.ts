import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BagTransferService } from '../services/bag-transfer.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-bag-transfer',
  templateUrl: './bag-transfer.component.html',
  styleUrls: ['./bag-transfer.component.scss']
})
export class BagTransferComponent implements OnInit {

  bagTransfer: any[] = [];
  

  constructor(private bagServices: BagTransferService, private http: HttpClient) { }

  headerTitle = "Transfer"
  apiUrl = 'http://localhost:3000/bagTransfers'

  ngOnInit(): void {
    this.bagServices.getTransfer().subscribe((res)=>{
      this.bagTransfer = res;
    })

  }

deleteTransferRow(id: number, index: number) {
  this.bagServices.deleteTransfer(id).subscribe(() => {
    this.bagTransfer.splice(index, 1); 
    alert('Transfer deleted successfully!');
  });
}



}
