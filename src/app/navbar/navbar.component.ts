import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'chl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  logo = environment.assetsUrl + '/favicon-32x32.png';

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

  isLoggedOut(): boolean {
    return !this.authService.isLoggedIn();
  }

  login(): void {
    this.authService.logIn();
  }

  logout(): void {
    this.authService.clearSession();
  }
}

