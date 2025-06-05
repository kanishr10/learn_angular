import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-tab',
  templateUrl: './header-tab.component.html',
  styleUrls: ['./header-tab.component.scss']
})
export class HeaderTabComponent implements OnInit {

  @Input() title!: string ;
  @Input("icon") public icon: any;
  @Input() items!: any[];
  @Input() active_item!: string;
  @Input() titleSize: boolean = false;

  userRole: any;
  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  gotoDashboard() {
    this.router.navigate(['/']);

  }

}
