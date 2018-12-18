import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { ChecklistenService } from './services/checklisten.service';
import { Logger } from '@nsalaun/ng-logger';


@Component({
  selector: 'chl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'checklistenapp';

  version = environment.version;
  envName = environment.envName;
  showEnv = !environment.production;
  api = environment.apiUrl;

  constructor(private checklistenService: ChecklistenService, private logger: Logger) {
    this.logger.debug('vor Laden der Checklisten');
    this.checklistenService.findAllChecklisten();

  }

  ngOnInit() {}
}
