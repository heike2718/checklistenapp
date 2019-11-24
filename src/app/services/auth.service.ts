import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { UserSession, STORAGE_KEY_ID_REFERENCE } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResult, LogService } from 'hewi-ng-lib';
import { ResponsePayload } from 'hewi-ng-lib';
import { SignUpPayload } from '../shared/model/signup-payload';
import { HttpErrorService } from '../error/http-error.service';
import { STORAGE_KEY_SESSION_EXPIRES_AT, STORAGE_KEY_DEV_SESSION_ID } from '../shared/model/user';
import { SessionService } from './session.service';



@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private httpClient: HttpClient
		, private httpErrorService: HttpErrorService
		, private sessionService: SessionService
		, private logger: LogService
		, private router: Router) {
	}


	checkMaySignUp(signUpPayload: SignUpPayload): Observable<ResponsePayload> {
		const url = environment.apiUrl + '/signup/secret';
		return this.httpClient.post<ResponsePayload>(url, signUpPayload);
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

	logOut() {

		let url = environment.apiUrl;

		const sessionId = localStorage.getItem(STORAGE_KEY_DEV_SESSION_ID);


		if (sessionId) {
			url = url + '/auth/dev/logout/' + sessionId;
		} else {
			url = url + '/auth/dev/logout/unknown';
		}

		if (environment.production) {
			url = environment.apiUrl + '/auth/logout';
		}

		this.logger.debug('url=' + url);

		this.httpClient.delete(url).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			_payload => {
				this.sessionService.clearSession();
			},
			(_error => {
				// ist nicht schlimm: die session bleibt auf dem Server
				this.sessionService.clearSession();
			}));

	}	signUp() {

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
				this.httpErrorService.handleError(error, 'signUp');
			}));
	}

	createSession(authResult: AuthResult) {

		window.location.hash = '';

		if ('login' === authResult.state) {
			const url = environment.apiUrl + '/auth/session';

			this.httpClient.post(url, authResult.idToken).pipe(
				map(res => <ResponsePayload>res),
				publishLast(),
				refCount()
			).subscribe(
				payload => {
					if (payload.data) {
						const userSession = payload.data as UserSession;

						localStorage.setItem(STORAGE_KEY_SESSION_EXPIRES_AT, JSON.stringify(userSession.expiresAt));
						localStorage.setItem(STORAGE_KEY_ID_REFERENCE, userSession.idReference);

						if (userSession.sessionId && !environment.production) {
							localStorage.setItem(STORAGE_KEY_DEV_SESSION_ID, userSession.sessionId);
						}

						this.router.navigateByUrl('/listen');
					}
				},
				(error => {
					this.httpErrorService.handleError(error, 'createSession');
				})
			);

		}

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
					this.httpErrorService.handleError(error, 'createUser');
				}));

	}
}

