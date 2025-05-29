import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
num: any;
showme = true;
color: any;
toDate = new Date();
message = "Welcome TO Angular";

value = "Kanish";
}
