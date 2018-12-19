import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'chl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

    @ViewChild(NgbCollapse) navbarToggler: NgbCollapse;


  constructor() { }

  ngOnInit() {
  }

  collapseNav() {
    if (this.navbarToggler) {
      this.isCollapsed = true;
    }
  }


}
