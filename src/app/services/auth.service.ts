import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, publishLast, refCount } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:max-line-length
import { STORAGE_KEY_JWT_REFRESH_TOKEN, STORAGE_KEY_JWT, STORAGE_KEY_JWT_EXPIRES_AT, JWTService, AuthResult, STORAGE_KEY_JWT_STATE } from 'hewi-ng-lib';
import { ResponsePayload } from 'hewi-ng-lib';
import { SignUpPayload } from '../shared/model/signup-payload';
import { HttpErrorService } from '../error/http-error.service';



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

		if (this.canLoadUserInfo()) {
			this.loadLocalUserInfo();
		}
	}


	checkMaySignUp(signUpPayload: SignUpPayload): Observable<ResponsePayload> {
		const url = environment.apiUrl + '/signup/secret';
		return this.httpClient.post<ResponsePayload>(url, signUpPayload);
	}

	private canLoadUserInfo(): boolean {

		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}
		return !this.jwtService.isJWTExpired();

	}


	logIn() {

		const url = environment.apiUrl + '/auth/login';

		this.httpClient.get(url).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			payload => {
				window.location.href = payload.message.message;
			},
			(error => {
				this.httpErrorService.handleError(error, 'logIn');
			}));
	}

	signUp() {

		const url = environment.apiUrl + '/auth/signup';

		this.httpClient.get(url).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			payload => {
				window.location.href = payload.message.message;
			},
			(error => {
				this.httpErrorService.handleError(error, 'logIn');
			}));
	}

	setSession(authResult: AuthResult) {

		// packen authResult ins LocalStorage, damit es ein refresh überlebt!
		if (authResult.refreshToken) {
			localStorage.setItem(STORAGE_KEY_JWT_REFRESH_TOKEN, authResult.refreshToken);
		}
		localStorage.setItem(STORAGE_KEY_JWT, authResult.idToken);
		localStorage.setItem(STORAGE_KEY_JWT_EXPIRES_AT, JSON.stringify(authResult.expiresAt));
		localStorage.setItem(STORAGE_KEY_JWT_STATE, authResult.state);

		if ('signup' === authResult.state) {
			this.createUser();
		}
	}

	private createUser() {
		const url = environment.apiUrl + '/signup/user';
		this.httpClient.post<ResponsePayload>(url, {}).
			subscribe(() => {
				this.router.navigateByUrl('/home');
			},
				(error => {
					this.httpErrorService.handleError(error, 'findChecklisteByKuerzel');
				}));

	}

	loadUserProfile(_authResult: AuthResult) {
		// TODO: hier könnte man vom AuthProvider mit Hilfe des accessToken noch die Mailadresse abholen oder sowas.
	}

	loadLocalUserInfo() {
	}
}

