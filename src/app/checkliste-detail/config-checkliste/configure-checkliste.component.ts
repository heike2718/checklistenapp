import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem, EINKAUFSLISTE } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';

@Component({
  selector: 'chl-configure-checkliste',
  templateUrl: './configure-checkliste.component.html',
  styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  bearbeiteteItems$: Observable<ChecklistenItem[]>;

  unbearbeiteteItems$: Observable<ChecklistenItem[]>;

  constructor() { }

  ngOnInit() {
    // TODO: unsubscribe!!!!
    this.checkliste$ = store.gewaehlteCheckliste$;
    this.bearbeiteteItems$ = store.bearbeiteteItems$;
    this.unbearbeiteteItems$ = store.unbearbeiteteItems$;
  }
}
