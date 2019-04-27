import * as moment from 'moment'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe, of } from 'rxjs';
import { filter, shareReplay, tap, map, catchError } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Logger } from '@nsalaun/ng-logger';
import { AuthResult, parseHash, AUTH_STATE_SIGNUP, AUTH_STATE_LOGIN, AUTH_STATE_EMPTY } from '../shared/utils/jwt.utils';
import { MessagesService, ResponsePayload } from 'hewi-ng-lib';
import { SignUpPayload } from '../shared/model/signup-payload';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // hier könnte userInformation als Observable gehalten werden, wenn erforderlich.
  private userSubject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.userSubject.asObservable().pipe(
    filter(_user => !!undefined)
  );

  constructor(private httpClient: HttpClient, private router: Router, private messagesService: MessagesService, private logger: Logger) {
    if (this.isLoggedIn()) {
      this.loadLocalUserInfo();
    }
  }

  parseHash(hash: string): void {

    // Am Ende nach success: (das wird in der URL hinter # zurückegeben)
    window.location.hash = '';

    const authResult: AuthResult = parseHash(hash);
    if (authResult && authResult.state) {
      switch (authResult.state) {
        case AUTH_STATE_EMPTY: break;
        case AUTH_STATE_SIGNUP:
          this.setSession(authResult);
          this.messagesService.info('Jetzt erstmal Benutzerkonto aktivieren. Guckstu ins Mailpostfach.');
          break;
        case AUTH_STATE_LOGIN:
          this.setSession(authResult);
          this.loadUserProfile(authResult); break;
        default: break;
      }
    }
  }

  checkMaySignUp(signUpPayload: SignUpPayload): Observable<ResponsePayload> {
    const url = environment.apiUrl + '/signup/secret';
    return this.httpClient.post<ResponsePayload>(url, signUpPayload);
  }


  signUp(): void {

    // TODO
    const authUrl = environment.authUrl + '/signup#clientId=' + environment.clientId + '&redirectUrl=' + environment.signinRedirectUrl;
    this.logger.debug('signUp: authUrl=' + authUrl);

    window.location.href = authUrl;

  }

  logIn(): void {

    // TODO
    const authUrl = environment.authUrl + '/login?clientId=' + environment.clientId + '&redirectUrl=' + environment.loginRedirectUrl;
    this.logger.debug('logIn: authUrl=' + authUrl);

    window.location.href = authUrl;

  }

  setSession(authResult: AuthResult) {
    // packen authResult ins LocalStorage, damit es ein refresh überlebt!
    // das accessToken wird in der Checklisten-App nicht benötigt
    if (authResult.refreshToken) {
      localStorage.setItem('refresh_token', authResult.refreshToken);
    }
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(authResult.expiresAt));
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  logout() {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // TODO: URL aufrufen, um beim AuthProvider das idToken zu invalidieren?
    this.router.navigateByUrl('/home');
  }

  loadUserProfile(authResult: AuthResult) {
    // TODO: hier könnte man vom AuthProvider mit Hilfe des accessToken noch die Mailadresse abholen oder sowas.
  }

  loadLocalUserInfo() {
  }
}

