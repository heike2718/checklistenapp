import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';

@Component({
  selector: 'chl-execute-checkliste',
  templateUrl: './execute-checkliste.component.html',
  styleUrls: ['./execute-checkliste.component.css']
})
export class ExecuteChecklisteComponent implements OnInit {

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
