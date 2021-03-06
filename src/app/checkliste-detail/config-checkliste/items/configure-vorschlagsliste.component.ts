import { Component, OnInit } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten, Filterkriterium, MODUS_CONFIG, LISTE_VORSCHLAEGE } from '../../../shared/model/checkliste';
import { findItemByName, filterChecklisteItems } from '../../../shared/utils/checkliste.utils';
import { environment } from '../../../../environments/environment';
import { store } from '../../../store/app-data';
import { Observable } from 'rxjs';
import { LogService } from 'hewi-ng-lib';


@Component({
	selector: 'chl-configure-vorschlagsliste',
	templateUrl: './configure-vorschlagsliste.component.html',
	styleUrls: ['./configure-vorschlagsliste.component.css']
})
export class ConfigureVorschlagslisteComponent implements OnInit {

	checkliste$: Observable<ChecklisteDaten>;

	showFilename: boolean;

	typ: string;

	constructor(private logger: LogService) {
		if (!environment.production) {
			this.showFilename = true;
		}
	}

	ngOnInit() {
		this.checkliste$ = store.gewaehlteCheckliste$;
	}

	getItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
		if (!checkliste) {
			return [];
		}

		this.typ = checkliste.typ;

		const kriterium: Filterkriterium = {
			modus: MODUS_CONFIG,
			semantik: LISTE_VORSCHLAEGE
		};

		return filterChecklisteItems(checkliste.items, kriterium);
	}

	subscribeAusgewaehlt(items: ChecklistenItem[], item: ChecklistenItem) {
		this.logger.debug('item ' + item.name + ' als bearbeitet markieren');
		const markiertesItem = findItemByName(items, item.name);

		if (markiertesItem) {
			markiertesItem.markiert = true;
		}
		store.updateChecklisteItems(items);
	}
}
