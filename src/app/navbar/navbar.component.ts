import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { JWTService, STORAGE_KEY_JWT_STATE } from 'hewi-ng-lib';
import { SessionService } from '../services/session.service';

@Component({
	selector: 'chl-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	isCollapsed = true;
	logo = environment.assetsUrl + '/favicon-32x32.png';

	@ViewChild(NgbCollapse) navbarToggler: NgbCollapse;


	constructor(private sessionService: SessionService
		, private authService: AuthService
		, private jwtService: JWTService) { }

	ngOnInit() {
	}

	collapseNav() {
		if (this.navbarToggler) {
			this.isCollapsed = true;
		}
	}

	isLoggedIn(): boolean {
		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}
		return !this.jwtService.isJWTExpired();
	}

	isLoggedOut(): boolean {
		return !this.isLoggedIn();
	}

	login(): void {
		this.authService.logIn();
	}

	logout(): void {
		this.sessionService.clearSession();
	}
}

