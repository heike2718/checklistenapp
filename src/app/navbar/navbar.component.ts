import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'chl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  @ViewChild(NgbCollapse) navbarToggler: NgbCollapse;


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  collapseNav() {
    if (this.navbarToggler) {
      this.isCollapsed = true;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isLoggerOut(): boolean {
    return !this.authService.isLoggedIn();
  }


}
