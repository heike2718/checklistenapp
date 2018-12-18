import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, MODUS_CONFIG, MODUS_EDIT } from '../shared/model/checkliste';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';

@Component({
  selector: 'chl-checkliste',
  templateUrl: './checkliste.component.html',
  styleUrls: ['./checkliste.component.css']
})
export class ChecklisteComponent implements OnInit {

  @Input()
  checkliste: ChecklisteDaten;

  showFilename: boolean;

  constructor(private router: Router, private logger: Logger) {
    if (!environment.production) {
      this.showFilename = true;
    }
  }

  ngOnInit(): void { }


  get classes() {

    // die styles referenzieren auf ein custom *.css-File, hier auf checkliste-component.css.
    // Mit true werden sie im Element dem classes-Attribut hinzugefügt.

    const cssClasses = {};

    if (this.checkliste && this.checkliste.typ) {
      const typ = this.checkliste.typ;
      switch (typ) {
        case EINKAUFSLISTE:
          cssClasses['card-einkaufsliste'] = true;
          break;
        case PACKLISTE:
          cssClasses['card-packliste'] = true;
          break;
        case TODOS:
          cssClasses['card-todos'] = true;
          break;
      }
    }
    return cssClasses;
  }

  configure() {
    this.logger.debug('ChecklisteComponent.configure: this.checkliste=' + this.checkliste);
    if (this.checkliste.kuerzel) {
      this.router.navigateByUrl('/checkliste/' + MODUS_CONFIG + '/' + this.checkliste.kuerzel);
    }
  }
  execute() {
    this.logger.debug('ChecklisteComponent.execute: this.checkliste=' + this.checkliste);
    if (this.checkliste.kuerzel) {
      this.router.navigateByUrl('/checkliste/' + MODUS_EDIT + '/' + this.checkliste.kuerzel);
    }
  }


}
