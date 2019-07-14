import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTService, STORAGE_KEY_JWT_STATE } from 'hewi-ng-lib';


@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(@Inject(JWTService) private jwtService: JWTService
		, private router: Router) { }

	canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}
		if (!this.jwtService.isJWTExpired()) {
			return true;
		}
		this.router.navigate(['/home'], {
			queryParams: {
				return: state.url
			}
		});
		return false;
	}
}

