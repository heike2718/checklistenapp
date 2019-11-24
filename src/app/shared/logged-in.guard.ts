import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { STORAGE_KEY_SESSION_EXPIRES_AT } from './model/user';
import { SessionService } from '../services/session.service';


@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(@Inject(SessionService) private sessionService: SessionService
		, private router: Router) { }

	canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		if (this.hasValidSession()) {
			return true;
		}

		this.router.navigate(['/home'], {
			queryParams: {
				return: state.url
			}
		});
		return false;
	}

	private hasValidSession(): boolean {
		const expiresAt = localStorage.getItem(STORAGE_KEY_SESSION_EXPIRES_AT);
		if (!expiresAt) {
			return false;
		}

		const sessionExpired = this.sessionService.sessionExpired();

		return !sessionExpired;
	}

}

