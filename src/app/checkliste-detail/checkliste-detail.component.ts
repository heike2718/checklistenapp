import { Component, OnInit } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten, MODUS_CONFIG, MODUS_EDIT } from '../shared/model/checkliste';
import { store } from '../store/app-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'chl-checkliste-detail',
  templateUrl: './checkliste-detail.component.html',
  styleUrls: ['./checkliste-detail.component.css']
})
export class ChecklisteDetailComponent implements OnInit {

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
