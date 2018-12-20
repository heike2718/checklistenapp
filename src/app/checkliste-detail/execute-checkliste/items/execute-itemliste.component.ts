import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten, LISTE_AUSGEWAEHLT, Filterkriterium, MODUS_EXEC } from '../../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../../store/app-data';
import { filterChecklisteItems, findItemByName } from '../../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-execute-itemliste',
  templateUrl: './execute-itemliste.component.html',
  styleUrls: ['./execute-itemliste.component.css']
})
export class ExecuteItemlisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  @Input()
  semantik: string;

  constructor() { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }

  getItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
    if (!checkliste) {
      return [];
    }

    const kriterium: Filterkriterium = {
      modus: MODUS_EXEC,
      semantik: this.semantik
    };

    return filterChecklisteItems(checkliste.items, kriterium);
  }

  toggleErledigt(checkliste: ChecklisteDaten, item: ChecklistenItem): void {

    const markiertesItem = findItemByName(checkliste.items, item.name);

    if (markiertesItem) {
      if (LISTE_AUSGEWAEHLT === this.semantik) {
        item.erledigt = true;
      } else {
        item.erledigt = false;
      }

      store.updateChecklisteItems(checkliste.items);
    }
  }
}


