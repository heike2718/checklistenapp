import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { JWTService } from 'hewi-ng-lib';
import { AuthService } from './services/auth.service';


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

	constructor(private jwtService: JWTService, private authService: AuthService) { }

	ngOnInit() {
		// nach dem redirect vom AuthProvider ist das die Stelle, an der die Anwendung wieder ankommt.
		// Daher hier redirect-URL parsen
		const hash = window.location.hash;
		if (hash && hash.indexOf('accessToken') > 0) {
			const authResult = this.jwtService.parseHash(hash);
			this.authService.setSession(authResult);
		}
	}
}
