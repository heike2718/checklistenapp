import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.css']
})
export class ItemButtonComponent implements OnInit {

  @Input()
  item: ChecklistenItem;

  @Input()
  checklisteTyp: string;

  constructor() {}

  ngOnInit() {
  }

  itemSelected(): void {

  }

}
