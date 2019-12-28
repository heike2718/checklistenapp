import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChecklisteTemplate, ChecklisteTemplateItem } from '../shared/model/checkliste';
import { store } from '../store/app-data';
import { environment } from 'src/environments/environment';

import * as _ from 'lodash';
import { TemplateService } from '../services/template.service';

@Component({
	selector: 'chl-template-detail',
	templateUrl: './template-detail.component.html',
	styleUrls: ['./template-detail.component.css']
})
export class TemplateDetailComponent implements OnInit, OnDestroy {


	template$: Observable<ChecklisteTemplate>;

	showFilename: boolean;

	nameItem: string;

	formNeuesTeilVisible: boolean;

	typ: string;

	items: ChecklisteTemplateItem[];

	private readTime: number;

	private templateSubscription: Subscription;

	constructor(private templateService: TemplateService) {

		this.showFilename = !environment.production;

	}

	ngOnInit() {

		this.template$ = store.gewaehltesTemplate$;
		this.nameItem = '';
		this.formNeuesTeilVisible = false;
		this.items = [];
		this.template$.subscribe(
			t => {
				this.items = this.sortItems(t.items);
				this.typ = t.typ;
				this.readTime = t.readTime;
			}
		);

		if (this.typ === undefined) {
			this.templateService.loadTemplates();
		}
	}

	ngOnDestroy() {
		if (this.templateSubscription) {
			this.templateSubscription.unsubscribe();
		}
	}

	toggleFormNeuesTeilVisible() {
		this.formNeuesTeilVisible = !this.formNeuesTeilVisible;
	}

	addItemDisabled(): boolean {
		if (!this.nameItem || this.nameItem.length === 0) {
			return true;
		}

		return this.isContained(this.nameItem);
	}

	addItem(): void {
		const item = {
			typ: this.typ,
			name: this.nameItem
		} as ChecklisteTemplateItem;

		this.items.push(item);
		this.items = this.sortItems(this.items);
		this.toggleFormNeuesTeilVisible();
		this.nameItem = '';
	}

	onDeselected(item: ChecklisteTemplateItem) {

		const kopie = [];

		this.items.forEach((el: ChecklisteTemplateItem) => {

			const name = el.name;
			if (name !== item.name) {
				kopie.push(el);
			}
		});

		this.items = this.sortItems(kopie);
	}

	save() {
		const template: ChecklisteTemplate = {
			typ: this.typ,
			items: this.items,
			readTime: this.readTime
		};

		this.templateService.saveTemplate(template, false);
	}

	saveAndClose() {
		const template: ChecklisteTemplate = {
			typ: this.typ,
			items: this.items,
			readTime: this.readTime
		};

		this.templateService.saveTemplate(template, true);
	}

	private sortItems(arr: ChecklisteTemplateItem[]): ChecklisteTemplateItem[] {

		const kopie = _.cloneDeep(arr);

		kopie.sort((a, b) => {

			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			return nameA.localeCompare(nameB);

		});


		return kopie;
	}

	private isContained(name: string): boolean {

		const vergl = name.toLowerCase();
		this.items.forEach(item => {
			const low = item.name.toLowerCase();

			if (vergl === low) {
				return true;
			}
		});
		return false;
	}

}



