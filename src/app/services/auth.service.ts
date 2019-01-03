import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, of } from 'rxjs';
import { filter, shareReplay, tap, map, catchError } from 'rxjs/operators';
import { User } from '../shared/model/user';
import { Http } from '@angular/http';
import { ResponsePayload } from '../shared/model/message';
import { environment } from '../../environments/environment';
import { Logger } from '@nsalaun/ng-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // hier könnte userInformation als Observable gehalten werden, wenn erforderlich.
  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject.asObservable().pipe(
    filter(_user => !!undefined)
  );

  constructor(private http: Http, private loggger: Logger) {
    if (this.isLoggedIn()) {
      this.loadUserInfo();
    }
  }

  parseHash(hash: string): void {
    this.loadUserInfo();
    // Am ende nach success:
    window.location.hash = '';
  }

  signIn(): void {

    const authUrl = environment.authUrl + '/signin?clientId=' + environment.clientId + '&redirectUrl=' + environment.signinRedirectUrl;
    this.loggger.debug('signIn: authUrl=' + authUrl);

    window.location.href = authUrl;

  }

  setSession(authResult) {
    // packen authResult ins LocalStorage, damit es ein refresh überlebt!
    // localStorage.setItem('id_token', JSON.stringify(authResult.idToken));
    localStorage.setItem('id_token', JSON.stringify(authResult));
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
    //   tap(payload => this.subject.next(payload.data)),
    //   catchError(err => of('error caught'))
    // ).subscribe();
  }
}
