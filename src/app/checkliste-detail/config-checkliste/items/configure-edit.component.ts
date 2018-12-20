import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem, Filterkriterium, MODUS_CONFIG, LISTE_AUSGEWAEHLT } from '../../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../../store/app-data';
import { findItemByName, filterChecklisteItems } from '../../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-configure-edit',
  templateUrl: './configure-edit.component.html',
  styleUrls: ['./configure-edit.component.css']
})
export class ConfigureEditComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  constructor() { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }

  getItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
    if (!checkliste) {
      return [];
    }

    const kriterium: Filterkriterium = {
      modus: MODUS_CONFIG,
      semantik: LISTE_AUSGEWAEHLT
    };

    return filterChecklisteItems(checkliste.items, kriterium);
  }


  unsubscribeAusgewaehlt(items: ChecklistenItem[], item: ChecklistenItem) {
    console.log('item ' + item.name + ' als bearbeitet markieren');
    const markiertesItem = findItemByName(items, item.name);

    if (markiertesItem) {
      markiertesItem.markiert = false;
    }
    store.updateChecklisteItems(items);
  }
}
