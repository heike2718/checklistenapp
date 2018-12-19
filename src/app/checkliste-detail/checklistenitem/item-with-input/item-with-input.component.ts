import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-item-with-input',
  templateUrl: './item-with-input.component.html',
  styleUrls: ['./item-with-input.component.css']
})
export class ItemWithInputComponent implements OnInit {

  @Input()
  checklistenitem: ChecklistenItem;

  constructor() { }

  ngOnInit() {
  }

}
