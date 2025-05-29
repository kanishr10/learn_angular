import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-onchange',
  templateUrl: './onchange.component.html',
  styleUrls: ['./onchange.component.scss']
})
export class OnchangeComponent implements OnChanges, OnInit, DoCheck {

  @Input() value: string | undefined;

  onOfTitles = 0

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['value']){
        // console.log(changes['value'].currentValue);
        console.log(changes);
      }
  }

  ngOnInit(): void {
      console.log(this.onOfTitles);
      this.onOfTitles = 1;
      console.log(this.onOfTitles);
  }

  ngDoCheck(): void {
      console.log("it will be called")
      this.onOfTitles = 2;
  }

}
