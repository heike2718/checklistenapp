import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { STORAGE_KEY_AUTH_STATE, STORAGE_KEY_ID_REFERENCE } from '../shared/model/user';

@Component({
	selector: 'chl-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


	constructor(private sessionService: SessionService) { }

	ngOnInit() {
	}

	showDialog(): boolean {
		const authState = localStorage.getItem(STORAGE_KEY_AUTH_STATE);
		return authState && 'signup' === authState;
	}

	closeModal(): void {
		this.sessionService.clearSession();
	}

	isLoggedIn(): boolean {

		const authState = localStorage.getItem(STORAGE_KEY_AUTH_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}

		const idReference = localStorage.getItem(STORAGE_KEY_ID_REFERENCE);
		return idReference !== null && idReference !== undefined;
	}
}


