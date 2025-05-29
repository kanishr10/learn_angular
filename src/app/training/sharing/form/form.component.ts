import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  cars: any[] = [];
  carName = "";

  // onSubmit(){
  //   this.cars.push(this.carName);
  //   this.carName = "";
  //   console.log(this.cars);
  // }

  onSubmitCarName() {
    this.cars.push(this.carName);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
