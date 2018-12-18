import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  showFilename = false;

  constructor(private checklistenService: ChecklistenService) {
    this.showFilename = !environment.production;
  }

  ngOnInit() {
    this.checklisten$ = store.checklisten$;
  }
}
