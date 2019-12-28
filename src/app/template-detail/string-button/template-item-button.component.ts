import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChecklisteTemplateItem } from 'src/app/shared/model/checkliste';

@Component({
	selector: 'chl-template-item-button',
	templateUrl: './template-item-button.component.html',
	styleUrls: ['./template-item-button.component.css']
})
export class TemplateItemButtonComponent implements OnInit {

	@Input()
	item: ChecklisteTemplateItem;

	@Output()
	deselected = new EventEmitter<ChecklisteTemplateItem>();

	constructor() { }

	ngOnInit() {
	}

	itemSelected() {
		this.deselected.emit(this.item);
	}

}
