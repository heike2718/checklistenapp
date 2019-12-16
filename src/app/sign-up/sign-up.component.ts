import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MessagesService } from 'hewi-ng-lib';
import { SignUpPayload } from '../shared/model/signup-payload';
import { publishLast, refCount } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HttpErrorService } from '../error/http-error.service';
import { Router } from '@angular/router';

@Component({
	selector: 'chl-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

	secret: string;

	kleber: string;

	private subscription: Subscription;



	constructor(private authService: AuthService
		, private httpErrorService: HttpErrorService
		, private router: Router
		, private messagesService: MessagesService) { }

	ngOnInit() {
		this.secret = '';
		this.kleber = '';
	}

	ngOnDestroy() {

		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}


	submit(): void {

		this.messagesService.clear();

		const signUpPayload: SignUpPayload = {
			secret: this.secret,
			kleber: this.kleber
		};

		const checkResponse$ = this.authService.checkMaySignUp(signUpPayload).pipe(
			publishLast(),
			refCount()
		);

		this.subscription = checkResponse$.subscribe(
			_payload => {
				this.authService.signUp();
			},
			(error => {
				this.httpErrorService.handleError(error, 'submitSecret');
			}));
	}


	cancel(): void {
		this.secret = '';
		this.kleber = '';
		this.messagesService.clear();
		this.router.navigateByUrl('/home');
	}

}


