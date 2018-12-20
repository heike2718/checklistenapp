import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';
import { getUnbearbeiteteItems, getBarbeiteteItems } from '../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-execute-checkliste',
  templateUrl: './execute-checkliste.component.html',
  styleUrls: ['./execute-checkliste.component.css']
})
export class ExecuteChecklisteComponent implements OnInit {

  checkliste: ChecklisteDaten;

  constructor() { }

  ngOnInit() {
    store.gewaehlteCheckliste$.subscribe(
      cl => this.checkliste = cl
    );
  }



  get unbearbeiteteItems() {
    return getUnbearbeiteteItems(this.checkliste);
  }

  get bearbeiteteItems() {
    return getBarbeiteteItems(this.checkliste);
  }
}
