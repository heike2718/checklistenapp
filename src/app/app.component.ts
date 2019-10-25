import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { JWTService, LogService } from 'hewi-ng-lib';
import { AuthService } from './services/auth.service';
import { OauthService } from './services/oauth.service';
import { SessionService } from './services/session.service';


@Component({
	selector: 'chl-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	version = environment.version;
	envName = environment.envName;
	showEnv = !environment.production;
	api = environment.apiUrl;
	logo = environment.assetsUrl + '/favicon-32x32.png';

	constructor(private jwtService: JWTService
		, private authService: AuthService
		, private oauthService: OauthService
		, private sessionService: SessionService) { }

	ngOnInit() {

		this.oauthService.orderClientAccessToken();

		if (this.jwtService.isJWTExpired()) {
			this.sessionService.clearSession();
		}

		// nach dem redirect vom AuthProvider ist das die Stelle, an der die Anwendung wieder ankommt.
		// Daher hier redirect-URL parsen
		const hash = window.location.hash;
		if (hash && hash.indexOf('idToken') > 0) {
			const authResult = this.jwtService.parseHash(hash);
			this.authService.setSession(authResult);
			if (this.oauthService.clientTokenWillExpireSoon()) {
				this.oauthService.orderClientAccessToken();
			}
		}
	}
}
