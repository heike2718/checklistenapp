import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:max-line-length
import { STORAGE_KEY_REFRESH_TOKEN, STORAGE_KEY_JWT, STORAGE_KEY_AUTH_STATE, STORAGE_KEY_EXPIRES_AT, JWTService, AuthResult, AUTH_STATE_SIGNUP, AUTH_STATE_EMPTY } from 'hewi-ng-lib';
import { ResponsePayload } from 'hewi-ng-lib';
import { SignUpPayload } from '../shared/model/signup-payload';
import { HttpErrorService } from '../error/http-error.service';
import { store } from '../store/app-data';



@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// hier könnte userInformation als Observable gehalten werden, wenn erforderlich.
	private userSubject = new BehaviorSubject<User>(undefined);

	user$: Observable<User> = this.userSubject.asObservable().pipe(
		filter(_user => !!undefined)
	);

	constructor(private httpClient: HttpClient
		, private httpErrorService: HttpErrorService
		, private router: Router
		, private jwtService: JWTService) {

		if (this.jwtService.isLoggedIn()) {
			this.loadLocalUserInfo();
		}
	}


	checkMaySignUp(signUpPayload: SignUpPayload): Observable<ResponsePayload> {
		const url = environment.apiUrl + '/signup/secret';
		return this.httpClient.post<ResponsePayload>(url, signUpPayload);
	}


	logIn() {
		const authUrl = this.jwtService.getLoginUrl(environment.authUrl, environment.clientId, environment.loginRedirectUrl);
		window.location.href = authUrl;
	}

	signUp() {
		const authUrl = this.jwtService.getSignupUrl(environment.authUrl, environment.clientId, environment.signupRedirectUrl);
		window.location.href = authUrl;
	}

	setSession(authResult: AuthResult) {

		if (authResult.state && AUTH_STATE_EMPTY === authResult.state) {
			this.clearSession();
			return;
		}

		// packen authResult ins LocalStorage, damit es ein refresh überlebt!
		if (authResult.refreshToken) {
			localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, authResult.refreshToken);
		}
		localStorage.setItem(STORAGE_KEY_JWT, authResult.idToken);
		localStorage.setItem(STORAGE_KEY_EXPIRES_AT, JSON.stringify(authResult.expiresAt));
		localStorage.setItem(STORAGE_KEY_AUTH_STATE, authResult.state);

		if (AUTH_STATE_SIGNUP === authResult.state) {
			this.createUser();
		}
	}

	private createUser() {
		const url = environment.apiUrl + '/signup/user';
		this.httpClient.post<ResponsePayload>(url, {}).
			subscribe(() => {
				store.updateAuthSignUpOutcome(true);
				this.router.navigateByUrl('/home');
			},
				(error => {
					this.httpErrorService.handleError(error, 'findChecklisteByKuerzel');
				}));

	}

	clearSession() {
		localStorage.removeItem(STORAGE_KEY_REFRESH_TOKEN);
		localStorage.removeItem(STORAGE_KEY_JWT);
		localStorage.removeItem(STORAGE_KEY_EXPIRES_AT);
		localStorage.removeItem(STORAGE_KEY_AUTH_STATE);
		// TODO: URL aufrufen, um beim AuthProvider das idToken zu invalidieren?
		store.updateAuthSignUpOutcome(false);
		store.updateAuthLogInOutcome(false);
		this.router.navigateByUrl('/home');
	}

	loadUserProfile(_authResult: AuthResult) {
		// TODO: hier könnte man vom AuthProvider mit Hilfe des accessToken noch die Mailadresse abholen oder sowas.
	}

	loadLocalUserInfo() {
	}
}

