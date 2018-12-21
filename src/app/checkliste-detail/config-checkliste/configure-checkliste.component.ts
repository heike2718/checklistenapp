import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'chl-configure-checkliste',
  templateUrl: './configure-checkliste.component.html',
  styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  name: string;

  constructor() { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }


  showFilename(): boolean {
    return !environment.production;
  }
}
