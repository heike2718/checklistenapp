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
        // TODO: hier muss der Response oder die URL des authproviders ausgewertet werden evtl mittels router oder so?
        this.authService.parseHash(window.location.hash);
    }
}
