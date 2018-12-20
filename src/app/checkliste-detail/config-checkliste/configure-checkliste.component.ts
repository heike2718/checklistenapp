import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { getUnbearbeiteteItems, getBarbeiteteItems } from '../../shared/utils/checkliste.utils';

@Component({
  selector: 'chl-configure-checkliste',
  templateUrl: './configure-checkliste.component.html',
  styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

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
