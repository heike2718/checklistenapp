import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { STORAGE_KEY_JWT } from 'hewi-ng-lib';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if (req.url === environment.jokesAPI) {
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

