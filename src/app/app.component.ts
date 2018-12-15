import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'chl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checklistenapp';

  stack1: string[] = [];

  stack2: string[] = [];

  version = environment.version;
  envName = environment.envName;
  showEnv = !environment.production;
  api = environment.apiUrl;

  constructor() {
    this.stack1 = ['Äpfel', 'Brötchen', 'bakjs', 'bakjsdk  shadhh', 'aksdak', 'klsdlahsh'];

    this.stack2 = ['Holunderbeeren', 'Fisch'];
  }

}
