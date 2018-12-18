import { Component, OnInit } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten, MODUS_CONFIG, MODUS_EDIT } from '../shared/model/checkliste';
import { store, initialCheckliste } from '../store/app-data';

@Component({
  selector: 'chl-checkliste-detail',
  templateUrl: './checkliste-detail.component.html',
  styleUrls: ['./checkliste-detail.component.css']
})
export class ChecklisteDetailComponent implements OnInit {

  checkliste: ChecklisteDaten = initialCheckliste;

  unbearbeiteteItems: ChecklistenItem[] = [];

  bearbeiteteItems: ChecklistenItem[] = [];

  constructor() { }

  ngOnInit() {
    // TODO: unsubscribe!!!!
    store.gewaehlteCheckliste$.subscribe(
      liste => this.checkliste = liste
    );
    store.unbearbeiteteItems$.subscribe(
      items => this.unbearbeiteteItems = items
    );
    store.bearbeiteteItems$.subscribe(
      items => this.bearbeiteteItems = items
    );
  }

  isConfig(): boolean {
    return this.checkliste.modus === MODUS_CONFIG;
  }
  isEdit(): boolean {
    return this.checkliste.modus === MODUS_EDIT;
  }
}
