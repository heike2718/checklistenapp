import { Component, ViewChild } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { SessionService } from '../services/session.service';
import { STORAGE_KEY_SESSION_EXPIRES_AT } from '../shared/model/user';

@Component({
	selector: 'chl-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	isCollapsed = true;
	logo = environment.assetsUrl + '/favicon-32x32.png';

	@ViewChild(NgbCollapse, { static: true }) navbarToggler: NgbCollapse;


	constructor(private authService: AuthService) { }

	collapseNav() {
		if (this.navbarToggler) {
			this.isCollapsed = true;
		}
	}

	isLoggedIn(): boolean {
		return !this.isLoggedOut();
	}


	isLoggedOut(): boolean {
		const expiresAt = localStorage.getItem(STORAGE_KEY_SESSION_EXPIRES_AT);
		return !expiresAt;
	}

	login(): void {
		this.authService.logIn();
	}

	logout(): void {
		this.authService.logOut();
	}
}

