import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
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

    constructor(private authService: AuthService) { }

    ngOnInit() {
        // nach dem redirect vom AuthProvider ist das die Stelle, an der die Anwendung wieder ankommt.
        // Daher hier redirect-URL parsen
        this.authService.parseHash(window.location.hash);
    }
}
