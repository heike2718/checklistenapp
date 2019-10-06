import * as moment_ from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../error/http-error.service';
import { environment } from '../../environments/environment';
import { publishLast, refCount, map } from 'rxjs/operators';
// tslint:disable-next-line:max-line-length
import { OAuthAccessTokenPayload, STORAGE_KEY_CLIENT_ACCESS_TOKEN, STORAGE_KEY_CLIENT_EXPIRES_AT, RefreshAccessTokenPayload, JWTPayload, SUFFIX_KEY_CLIENT_ACCESS_TOKEN } from '../shared/model/oauth.model';
import { ResponsePayload, STORAGE_KEY_JWT_REFRESH_TOKEN, STORAGE_KEY_JWT, STORAGE_KEY_JWT_EXPIRES_AT, MessagesService } from 'hewi-ng-lib';
import { store } from '../store/app-data';
import { SessionService } from './session.service';
import { Logger } from '@nsalaun/ng-logger';

const moment = moment_;

@Injectable({
	providedIn: 'root'
})
export class OauthService {

	constructor(private http: HttpClient
		, private sessionService: SessionService
		, private httpErrorService: HttpErrorService
		, private logger: Logger) { }

	orderClientAccessToken() {

		const accessToken = localStorage.getItem(STORAGE_KEY_CLIENT_ACCESS_TOKEN);

		let url = environment.apiUrl + '/accesstoken/';

		if (accessToken) {
			url += accessToken;
		} else {
			url += 'initial';
		}

		this.http.get<ResponsePayload>(url).pipe(
			publishLast(),
			refCount()
		).subscribe(
			(respPayload: ResponsePayload) => {
				const tokenPayload = respPayload.data as OAuthAccessTokenPayload;
				this.storeClientToken(tokenPayload);
			},
			error => this.httpErrorService.handleError(error, 'orderClientAccessToken')
		);

	}

	refreshJWT(force: boolean) {

		// const url = environment.apiUrl + '/session/jwt';
		const url = environment.authApiUrl + '/jwt';

		const _accessTokens: string[] = this.getAllClientAccessTokens();

		const requestPayload: RefreshAccessTokenPayload = {
			clientAccessToken: _accessTokens,
			userRefreshToken: localStorage.getItem(STORAGE_KEY_JWT_REFRESH_TOKEN),
			force: force
		};

		this.http.post(url, requestPayload).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			payload => {
				const level = payload.message.level;
				if (level === 'INFO') {

					const data: JWTPayload = payload.data;

					this.logger.debug(JSON.stringify(data));

					if (data) {
						// das expiresAt sind Sekunden seit 01.01.1970
						localStorage.setItem(STORAGE_KEY_JWT, data.jwt);
						localStorage.setItem(STORAGE_KEY_JWT_EXPIRES_AT, JSON.stringify(data.expiresAtSeconds));
					}
				} else {
					this.sessionService.clearSession();
				}

			},
			error => this.httpErrorService.handleError(error, 'refreshJWT')
		);

	}

	private getAllClientAccessTokens(): string[] {
		const _accessTokens: string[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key.indexOf(SUFFIX_KEY_CLIENT_ACCESS_TOKEN) >= 0) {
				const val = localStorage.getItem(key);
				if (val) {
					_accessTokens.push(val);
				}
			}
		}
		return _accessTokens;
	}

	private storeClientToken(token: OAuthAccessTokenPayload) {
		localStorage.setItem(STORAGE_KEY_CLIENT_ACCESS_TOKEN, token.accessToken);
		localStorage.setItem(STORAGE_KEY_CLIENT_EXPIRES_AT, JSON.stringify(token.expiresAt));
		store.updateClientAccessToken(token.accessToken);
	}

	clientTokenWillExpireSoon(): boolean {

		this.logger.debug('check client access token');

		// client_token_expires_at ist in Millisekunden seit 01.01.1970
		const expiration = this.getExpirationAsMoment();
		if (expiration === null) {
			return true;
		}
		// lassen 3,5 Minuten Vorsprung zum refreshen des accessTokens.
		const expired = moment().add(210, 'seconds').isAfter(expiration);
		return expired;
	}

	private getExpirationAsMoment() {
		if (!localStorage.getItem(STORAGE_KEY_CLIENT_EXPIRES_AT)) {
			this.logger.debug('no client access token present');
			return null;
		}
		const expiration = localStorage.getItem(STORAGE_KEY_CLIENT_EXPIRES_AT);
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}
}
