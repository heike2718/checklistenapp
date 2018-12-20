import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'chl-execute-checkliste',
  templateUrl: './execute-checkliste.component.html',
  styleUrls: ['./execute-checkliste.component.css']
})
export class ExecuteChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  constructor() { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }

  getStatistik(checkliste: ChecklisteDaten): string {

    const anzahlGesamt = checkliste.items.length;
    let anzahlErledigt = 0;
    checkliste.items.forEach(
      item => { if (item.erledigt) { anzahlErledigt++; } }
    );

    return anzahlErledigt + ' von ' + anzahlGesamt + ' abgehakt';
  }



  showFilename(): boolean {
    return !environment.production;
  }
}
