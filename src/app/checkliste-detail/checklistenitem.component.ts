import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../shared/model/checkliste';

@Component({
  selector: 'chl-checklistenitem',
  templateUrl: './checklistenitem.component.html',
  styleUrls: ['./checklistenitem.component.css']
})
export class ChecklistenitemComponent implements OnInit {

  @Input()
  checklistenitem: ChecklistenItem;

  constructor() { }

  ngOnInit() {
  }

}
