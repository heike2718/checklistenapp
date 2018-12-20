import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, Filterkriterium, LISTE_VORSCHLAEGE } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { filterChecklisteItems } from '../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-configure-checkliste',
  templateUrl: './configure-checkliste.component.html',
  styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  constructor() { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }

  getStatistik(checkliste: ChecklisteDaten): string {

    const kriterium: Filterkriterium = {
      modus: checkliste.modus,
      semantik: LISTE_VORSCHLAEGE
    };
    const items = filterChecklisteItems(checkliste.items, kriterium);
    const anzahlAusgewaehlt = items;
    return anzahlAusgewaehlt + ' vorgemerkte Dinge:';
  }


  showFilename(): boolean {
    return !environment.production;
  }
}
