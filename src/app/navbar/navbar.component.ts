import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { JWTService, STORAGE_KEY_JWT_STATE } from 'hewi-ng-lib';
import { SessionService } from '../services/session.service';
import { OauthService } from '../services/oauth.service';
import { Subscription, interval } from 'rxjs';

@Component({
	selector: 'chl-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

	isCollapsed = true;
	logo = environment.assetsUrl + '/favicon-32x32.png';

	private refrehTokenTimerSubscription: Subscription;


	@ViewChild(NgbCollapse) navbarToggler: NgbCollapse;


	constructor(private sessionService: SessionService
		, private authService: AuthService
		, private oauthService: OauthService
		, private jwtService: JWTService) { }

	ngOnInit() {
		this.refrehTokenTimerSubscription = interval(2 * 60 * 1000)
			.subscribe(() => {
				const _expMinutes = this.jwtService.jwtDurationMinutes();
				if (_expMinutes <= 3) {
					this.oauthService.refreshJWT();
				}
			});

	}

	ngOnDestroy() {
		if (this.refrehTokenTimerSubscription) {
			this.refrehTokenTimerSubscription.unsubscribe();
		}
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

