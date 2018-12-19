import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-item-with-button',
  templateUrl: './item-with-button.component.html',
  styleUrls: ['./item-with-button.component.css']
})
export class ItemWithButtonComponent implements OnInit {

  @Input()
  checklistenitem: ChecklistenItem;

  constructor() { }

  ngOnInit() {
  }
}
