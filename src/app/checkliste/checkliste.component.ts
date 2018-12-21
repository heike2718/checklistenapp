import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklisteDaten, MODUS_CONFIG, MODUS_EXEC } from '../shared/model/checkliste';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';
import { ChecklistenService } from '../services/checklisten.service';

@Component({
  selector: 'chl-checkliste',
  templateUrl: './checkliste.component.html',
  styleUrls: ['./checkliste.component.css']
})
export class ChecklisteComponent implements OnInit {

  @Input()
  checkliste: ChecklisteDaten;

  showFilename: boolean;

  constructor(private router: Router, private checklistenService: ChecklistenService, private logger: Logger) {
    if (!environment.production) {
      this.showFilename = true;
    }
  }

  ngOnInit(): void { }

  configure() {
    this.logger.debug('ChecklisteComponent.configure: this.checkliste=' + JSON.stringify(this.checkliste));
    this.router.navigateByUrl('/checkliste/' + MODUS_CONFIG + '/' + this.checkliste.kuerzel);
  }
  execute() {
    this.logger.debug('ChecklisteComponent.execute: this.checkliste=' + JSON.stringify(this.checkliste));
    this.router.navigateByUrl('/checkliste/' + MODUS_EXEC + '/' + this.checkliste.kuerzel);
  }

  delete() {
    this.logger.debug('ChecklisteComponent.delete: this.checkliste=' + JSON.stringify(this.checkliste));
    this.checklistenService.deleteCheckliste(this.checkliste);
  }
}
