import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //   users =[
  //     {
  //     name:"kanish",
  //     age:23,
  //     email:"kanish@gmail.com",
  //     phone:7564769887,
  //     boolean:false,
  //     salary:34.89
  //   },
  //     {
  //     name:"mohan",
  //     age:23,
  //     email:"kanish@gmail.com",
  //     phone:7564769887,
  //     boolean:false,
  //     salary:34.89
  //   },
  //     {
  //     name:"ramesh",
  //     age:23,
  //     email:"kanish@gmail.com",
  //     phone:7564769887,
  //     boolean:false,
  //     salary:34.89
  //   },
  //     {
  //     name:"vishnu",
  //     age:23,
  //     email:"kanish@gmail.com",
  //     phone:7564769887,
  //     boolean:false,
  //     salary:34.89
  //   },
  //     {
  //     name:"nithees",
  //     age:23,
  //     email:"kanish@gmail.com",
  //     phone:7564769887,
  //     boolean:false,
  //     salary:34.89
  //   },
  // ]

  // users!: FormGroup;


  // title = "Padi da dash uh"

  // getTitle(event:Event) {
  //   return this.title;
  // }

  // enterValue: any;
  // onInputCange(event:Event){
  //   this.enterValue = (event.target as HTMLInputElement).value;
  //   // name = value;
  // }
  // count = 0;
  // clickMe(change:number){
  //   this.count += change;
  // }

  title = '';
  updateTitle(event:Event){
    this.title =  (event.target as HTMLInputElement).value;
  }
}
