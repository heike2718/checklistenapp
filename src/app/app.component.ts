import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { JWTService } from 'hewi-ng-lib';
import { AuthService } from './services/auth.service';
import { OauthService } from './services/oauth.service';
import { Logger } from '@nsalaun/ng-logger';


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
		, private logger: Logger) { }

	ngOnInit() {

		// bei Seitenaufruf sofort ein frisches client-Token holen. Anschließend wird gepollt.
		if (this.oauthService.clientWillExpireSoon()) {
			this.logger.debug('clientAccessToken holen');
			this.oauthService.orderClientAccessToken();
		}

		// nach dem redirect vom AuthProvider ist das die Stelle, an der die Anwendung wieder ankommt.
		// Daher hier redirect-URL parsen
		const hash = window.location.hash;
		if (hash && hash.indexOf('idToken') > 0) {
			const authResult = this.jwtService.parseHash(hash);
			this.authService.setSession(authResult);
		}
	}
}
