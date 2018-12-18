import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../shared/model/checkliste';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'chl-checklistenitem',
  templateUrl: './checklistenitem.component.html',
  styleUrls: ['./checklistenitem.component.css']
})
export class ChecklistenitemComponent implements OnInit {

  @Input()
  checklistenitem: ChecklistenItem;

  constructor(private _logger: Logger) { }

  ngOnInit() {}

}
