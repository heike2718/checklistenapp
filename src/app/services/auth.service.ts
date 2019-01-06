import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, of } from 'rxjs';
import { filter, shareReplay, tap, map, catchError } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { Http } from '@angular/http';
import { ResponsePayload } from '../shared/model/message';
import { environment } from '../../environments/environment';
import { Logger } from '@nsalaun/ng-logger';
import { AuthResult, parseHash, AUTH_STATE_SIGNIN, AUTH_STATE_LOGIN, AUTH_STATE_EMPTY } from '../shared/utils/jwt.utils';
import { MessagesService } from '../messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // hier könnte userInformation als Observable gehalten werden, wenn erforderlich.
  private userSubject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.userSubject.asObservable().pipe(
    filter(_user => !!undefined)
  );

  constructor(private http: Http, private messagesService: MessagesService, private logger: Logger) {
    if (this.isLoggedIn()) {
      this.loadUserInfo();
    }
  }

  parseHash(hash: string): void {

    // Am ende nach success: (das wird in der URL hinter # zurückegeben)
    window.location.hash = '';

    const authResult: AuthResult = parseHash(hash);
    if (authResult.state) {
      switch (authResult.state) {
        case AUTH_STATE_EMPTY: break;
        case AUTH_STATE_SIGNIN:
          this.setSession(authResult);
          this.messagesService.info('Jetzt erstmal Benutzerkonto aktivieren. Guckstu ins Mailpostfach.');
          break;
        case AUTH_STATE_LOGIN: this.loadUserInfo(); break;
        default: break;
      }
    }
  }


  signIn(): void {

    const authUrl = environment.authUrl + '/signin?clientId=' + environment.clientId + '&redirectUrl=' + environment.signinRedirectUrl;
    this.logger.debug('signIn: authUrl=' + authUrl);

    window.location.href = authUrl;

  }

  setSession(authResult: AuthResult) {
    // packen authResult ins LocalStorage, damit es ein refresh überlebt!
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_in', authResult.expiresIn);
  }

  isLoggedIn(): boolean {
    return false;
  }

  logout() {
    localStorage.removeItem('id_token');
    // TODO: rausrouten: router.navigateByUrl(...);
  }

  loadUserInfo() {

    // TODO: ist nur grobes gerüst.
    // this.http.put('/url', { property: 'property' }).pipe(
    //   shareReplay(),
    //   map(resp => <ResponsePayload>resp.json()),
    //   tap(payload => this.userSubject.next(payload.data)),
    //   catchError(err => of('error caught'))
    // ).subscribe();
  }

}
