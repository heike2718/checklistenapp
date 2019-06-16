import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChecklisteDaten, ChecklistenItem, Filterkriterium, MODUS_CONFIG, LISTE_AUSGEWAEHLT } from '../../../shared/model/checkliste';
import { Observable, Subscription } from 'rxjs';
import { store } from '../../../store/app-data';
import { findItemByName, filterChecklisteItems } from '../../../shared/utils/checkliste.utils';

@Component({
	selector: 'chl-configure-edit',
	templateUrl: './configure-edit.component.html',
	styleUrls: ['./configure-edit.component.css']
})
export class ConfigureEditComponent implements OnInit, OnDestroy {

	checkliste$: Observable<ChecklisteDaten>;

	private checkliste: ChecklisteDaten;

	private checklisteSubscription: Subscription;

	constructor() { }

	ngOnInit() {
		this.checkliste$ = store.gewaehlteCheckliste$;

		this.checklisteSubscription = this.checkliste$.subscribe(chl => this.checkliste = chl);

	}

	ngOnDestroy() {
		this.checklisteSubscription.unsubscribe();
	}

	getItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
		if (!checkliste) {
			return [];
		}

		const kriterium: Filterkriterium = {
			modus: MODUS_CONFIG,
			semantik: LISTE_AUSGEWAEHLT
		};

		return filterChecklisteItems(checkliste.items, kriterium);
	}


	unsubscribeAusgewaehlt(items: ChecklistenItem[], item: ChecklistenItem) {
		console.log('item ' + item.name + ' als bearbeitet markieren');
		const markiertesItem = findItemByName(items, item.name);

		if (markiertesItem) {
			markiertesItem.markiert = false;
		}
		store.updateChecklisteItems(items);
	}

	onDeselected(item: ChecklistenItem) {
		const markiertesItem = findItemByName(this.checkliste.items, item.name);

		if (markiertesItem) {
			markiertesItem.markiert = false;
		}
	}
}
