import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { STORAGE_KEY_JWT } from 'hewi-ng-lib';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		// wenn es der accesstoken-request ist, sollte kein JWT hinzugefügt werden, da es sonst eine 401 gibt
		if (req.url === environment.jokesAPI || req.url.indexOf('/accesstoken') > 0) {
			return next.handle(req);
		}

		const idToken = localStorage.getItem(STORAGE_KEY_JWT);
		if (idToken) {
			const cloned = req.clone({
				headers: req.headers.set('Authorization', 'Bearer ' + idToken)
			});
			return next.handle(cloned);

		} else {
			return next.handle(req);
		}
	}
}

