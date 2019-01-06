import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { MessagesService, MessagesComponent } from 'hewi-ng-lib';


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
         this.authService.parseHash(window.location.hash);
    }
}
