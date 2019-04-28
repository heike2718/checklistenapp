import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChecklisteDaten, MODUS_CONFIG, MODUS_EXEC, Filterkriterium, LISTE_VORSCHLAEGE } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { ChecklistenService } from '../services/checklisten.service';
import { filterChecklisteItems } from '../shared/utils/checkliste.utils';
import { ModalService } from 'hewi-ng-lib';

@Component({
  selector: 'chl-checkliste',
  templateUrl: './checkliste.component.html',
  styleUrls: ['./checkliste.component.css']
})
export class ChecklisteComponent implements OnInit {

  @Input()
  checkliste: ChecklisteDaten;

  showFilename: boolean;

  constructor(private router: Router,
    private checklistenService: ChecklistenService,
    private modalService: ModalService) {
    if (!environment.production) {
      this.showFilename = true;
    }
  }

  ngOnInit(): void { }

  configure() {
    this.router.navigateByUrl('/checkliste/' + MODUS_CONFIG + '/' + this.checkliste.kuerzel);
  }
  execute() {
    this.router.navigateByUrl('/checkliste/' + MODUS_EXEC + '/' + this.checkliste.kuerzel);
  }

  delete() {
    this.checklistenService.deleteCheckliste(this.checkliste);
  }

  closeModalQuietly() {
    this.modalService.close();
  }

  getAnzahlOffeneItems(checkliste: ChecklisteDaten): number {
    const kriterium: Filterkriterium = {
      modus: MODUS_EXEC,
      semantik: LISTE_VORSCHLAEGE
    };

    return filterChecklisteItems(checkliste.items, kriterium).length;
  }

  executeDisabled(checkliste: ChecklisteDaten) {
    return this.getAnzahlOffeneItems(checkliste) === 0;
  }

}
