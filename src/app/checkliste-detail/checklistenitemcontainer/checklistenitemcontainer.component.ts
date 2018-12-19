import { Component, OnInit, Input } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem } from '../../shared/model/checkliste';

@Component({
  selector: 'chl-checklistenitemcontainer',
  templateUrl: './checklistenitemcontainer.component.html',
  styleUrls: ['./checklistenitemcontainer.component.css']
})
export class ChecklistenitemcontainerComponent implements OnInit {

  @Input()
  items: ChecklistenItem[];

  @Input()
  mitKommentar: boolean;

  constructor() { }

  ngOnInit() {
  }

}
