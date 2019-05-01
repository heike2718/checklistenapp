import { Component, OnInit } from '@angular/core';
import { store } from '../store/app-data';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Logger } from '@nsalaun/ng-logger';
import { AUTH_STATE_SIGNUP } from '../shared/utils/jwt.utils';

@Component({
  selector: 'chl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  authSignUpOutcome$: Observable<boolean>;

  constructor(private authService: AuthService, private logger: Logger) { }

  ngOnInit() {
    this.authSignUpOutcome$ = store.authSignUpOutcome$;

    this.authSignUpOutcome$.subscribe(val => {
      this.logger.debug('HomeComponent: signInOutcome=' + val);
    });


  }

  showDialog(): boolean {
    const authState = localStorage.getItem('auth_state');
    return authState && AUTH_STATE_SIGNUP === authState;
  }

  closeModal(): void {
    this.authService.clearSession();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}

