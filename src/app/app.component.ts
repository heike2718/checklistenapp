import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'chl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checklistenapp';

  version = environment.version;
  envName = environment.envName;
  showEnv = !environment.production;
  api = environment.apiUrl;
}
