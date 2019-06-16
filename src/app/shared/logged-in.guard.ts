import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTService } from 'hewi-ng-lib';


@Injectable()
export class LoggedInGuard implements CanActivate {

	constructor(@Inject(JWTService) private jwtService: JWTService
		, private router: Router) { }

	canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

		if (this.jwtService.isLoggedIn()) {
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

