import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(@Inject(AuthService) private authService: AuthService
    , private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.authService.isLoggedIn()) {
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

