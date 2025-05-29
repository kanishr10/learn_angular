import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  @Input('carsInput') cars: any[] = [];

  carsData: any[] = [this.cars];

  @Output() carAdded: EventEmitter<any[]> = new EventEmitter;

  // onSubmit(){
  //   this.carsData.push(this.carsData)
  //   this.carAdded.emit(this.carsData);
  // }

  onSubmitCarsData() {
    this.cars.push(this.carsData);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
