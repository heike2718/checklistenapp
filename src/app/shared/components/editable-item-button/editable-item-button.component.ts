import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-editable-item-button',
  templateUrl: './editable-item-button.component.html',
  styleUrls: ['./editable-item-button.component.css']
})
export class EditableItemButtonComponent implements OnInit {

  @Input()
  item: ChecklistenItem;

  @Input()
  checklisteTyp: string;

  @Input()
  modus: string;

  @Output()
  deselected = new EventEmitter<ChecklistenItem>();

  kommentarItem: string;

  optinalItem: boolean;

  formEditVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.formEditVisible = false;
    this.kommentarItem = this.item.kommentar ? this.item.kommentar : '';
    this.optinalItem = this.item.optional ? this.item.optional : false;
  }

  saveItem() {
    this.item.kommentar = this.kommentarItem.trim();
    this.item.optional = this.optinalItem;
    this.formEditVisible = false;
  }

  cancelEdid() {
    this.formEditVisible = false;
  }

  editItem() {
    this.formEditVisible = true;
  }

  itemSelected() {
    this.deselected.emit(this.item);
  }
}

