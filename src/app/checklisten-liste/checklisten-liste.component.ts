import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten } from '../shared/model/checkliste';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  constructor(private checklistenService: ChecklistenService) { }

  ngOnInit() {
    this.checklisten$ = this.checklistenService.findAllChecklisten();
  }
}
