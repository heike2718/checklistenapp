import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChecklisteDaten, MODUS_SCHROEDINGER, ChecklistenItem } from '../shared/model/checkliste';

import * as _ from 'lodash';

const initialCheckliste: ChecklisteDaten = {
	kuerzel: '',
	typ: '',
	modus: MODUS_SCHROEDINGER,
	items: [],
	version: 0
};



@Injectable({
	providedIn: 'root'
})
export class DataStore {

	private gewaehlteChecklisteSubject = new BehaviorSubject<ChecklisteDaten>(initialCheckliste);

	private checklistenSubject = new BehaviorSubject<ChecklisteDaten[]>([]);

	private clientAccessTokenSubject = new BehaviorSubject<string>('');

	private apiVersionSubject = new BehaviorSubject<string>('');

	gewaehlteCheckliste$: Observable<ChecklisteDaten> = this.gewaehlteChecklisteSubject.asObservable();

	checklisten$: Observable<ChecklisteDaten[]> = this.checklistenSubject.asObservable();

	clientAccessToken$: Observable<string> = this.clientAccessTokenSubject.asObservable();

	apiVersion$: Observable<string> = this.apiVersionSubject.asObservable();


	initChecklisten(alleChecklisten: ChecklisteDaten[]) {
		this.checklistenSubject.next(_.cloneDeep(alleChecklisten));
	}

	addCheckliste(checkliste: ChecklisteDaten) {
		const neueListe = _.cloneDeep(this.checklistenSubject.value);
		neueListe.push(checkliste);
		this.checklistenSubject.next(neueListe);
	}

	deleteCheckliste(kuerzel: string) {
		const checklisten = this.checklistenSubject.value;

		// tslint:disable-next-line:only-arrow-functions
		const restliche = _.remove(checklisten, function(chl) {
			return chl.kuerzel !== kuerzel;
		});

		this.checklistenSubject.next(_.cloneDeep(restliche));
	}

	updateCheckliste(checkliste: ChecklisteDaten) {
		const kopie: ChecklisteDaten = _.cloneDeep(checkliste);
		this.gewaehlteChecklisteSubject.next(kopie);

		const geaenderteChecklisten = [];
		this.checklistenSubject.value.forEach(element => {
			if (element.kuerzel !== checkliste.kuerzel) {
				geaenderteChecklisten.push(element);
			} else {
				geaenderteChecklisten.push(checkliste);
			}
		});
		this.checklistenSubject.next(geaenderteChecklisten);
	}

	updateChecklisteItems(items: ChecklistenItem[]) {
		const checkliste = this.gewaehlteChecklisteSubject.value;
		if (checkliste) {
			checkliste.items = items;
			this.updateCheckliste(checkliste);
		}
	}

	getKuerzelGewaehlteCheckliste(): string {
		const checkliste: ChecklisteDaten = this.gewaehlteChecklisteSubject.value;
		return checkliste ? checkliste.kuerzel : undefined;
	}

	findChecklisteByKuerzel(kuerzel: string): ChecklisteDaten {
		const treffer = _.find(this.checklistenSubject.value, ['kuerzel', kuerzel]);
		if (treffer) {
			return  treffer as ChecklisteDaten;
		}

		return undefined;
	}

	updateClientAccessToken(token: string) {
		this.clientAccessTokenSubject.next(token);
	}

	updateApiVersion(version: string) {
		this.apiVersionSubject.next(version);
	}
}

export const store = new DataStore();

