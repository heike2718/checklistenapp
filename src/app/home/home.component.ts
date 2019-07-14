import { Component, OnInit } from '@angular/core';
import { JWTService, STORAGE_KEY_JWT_STATE } from 'hewi-ng-lib/';
import { SessionService } from '../services/session.service';

@Component({
	selector: 'chl-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


	constructor(private jwtService: JWTService, private sessionService: SessionService) { }

	ngOnInit() {
	}

	showDialog(): boolean {
		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		return authState && 'signup' === authState;
	}

	closeModal(): void {
		this.sessionService.clearSession();
	}

	isLoggedIn(): boolean {

		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}

		return !this.jwtService.isJWTExpired();
	}
}


