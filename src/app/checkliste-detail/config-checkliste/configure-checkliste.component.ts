import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, Filterkriterium, MODUS_CONFIG, LISTE_AUSGEWAEHLT } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ChecklistenService } from '../../services/checklisten.service';
import { filterChecklisteItems } from '../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-configure-checkliste',
  templateUrl: './configure-checkliste.component.html',
  styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  name: string;

  constructor(private router: Router, private checklistenService: ChecklistenService) { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }


  showFilename(): boolean {
    return !environment.production;
  }

  saveDisabled(checkliste: ChecklisteDaten): boolean {
    if (!checkliste.name || checkliste.name.length === 0) {
      return true;
    }
    const kriterium: Filterkriterium = {
      modus: MODUS_CONFIG,
      semantik: LISTE_AUSGEWAEHLT
    };

    const ausgewaehlteItems = filterChecklisteItems(checkliste.items, kriterium);
    if (ausgewaehlteItems.length === 0) {
      return true;
    }
    return false;
  }

  save(checkliste: ChecklisteDaten) {

  }

  saveAndClose(checkliste: ChecklisteDaten) {
    this.router.navigateByUrl('/listen');
  }

  delete(checkliste: ChecklisteDaten) {
    this.router.navigateByUrl('/listen');
  }
}
