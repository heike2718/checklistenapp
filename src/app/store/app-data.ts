import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChecklisteDaten, MODUS_SCHROEDINGER, ChecklistenItem
	, ChecklisteTemplate, ChecklisteTemplateItem } from '../shared/model/checkliste';

import * as _ from 'lodash';

const initialCheckliste: ChecklisteDaten = {
	kuerzel: '',
	typ: '',
	modus: MODUS_SCHROEDINGER,
	items: [],
	version: 0
};

const initialTemplate: ChecklisteTemplate = {
	typ: undefined,
	items: [],
	readTime: 0
};


@Injectable({
	providedIn: 'root'
})
export class DataStore {

	private gewaehlteChecklisteSubject = new BehaviorSubject<ChecklisteDaten>(initialCheckliste);

	private checklistenSubject = new BehaviorSubject<ChecklisteDaten[]>([]);

	private clientAccessTokenSubject = new BehaviorSubject<string>('');

	private apiVersionSubject = new BehaviorSubject<string>('');

	private gewaehltesTemplateSubject = new BehaviorSubject<ChecklisteTemplate>(initialTemplate);

	private checklistenTemplatesSubject = new BehaviorSubject<ChecklisteTemplate[]>([]);

	gewaehlteCheckliste$: Observable<ChecklisteDaten> = this.gewaehlteChecklisteSubject.asObservable();

	gewaehltesTemplate$: Observable<ChecklisteTemplate> = this.gewaehltesTemplateSubject.asObservable();

	checklisten$: Observable<ChecklisteDaten[]> = this.checklistenSubject.asObservable();

	templates$: Observable<ChecklisteTemplate[]> = this.checklistenTemplatesSubject.asObservable();

	clientAccessToken$: Observable<string> = this.clientAccessTokenSubject.asObservable();

	apiVersion$: Observable<string> = this.apiVersionSubject.asObservable();


	initChecklisten(alleChecklisten: ChecklisteDaten[]) {
		this.checklistenSubject.next(_.cloneDeep(alleChecklisten));
	}

	initTemplates(alleTemplates: ChecklisteTemplate[]) {
		this.checklistenTemplatesSubject.next(_.cloneDeep(alleTemplates));
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
		const geaenderteChecklisten = [];
		this.checklistenSubject.value.forEach(element => {
			if (element.kuerzel !== checkliste.kuerzel) {
				geaenderteChecklisten.push(element);
			} else {
				geaenderteChecklisten.push(kopie);
			}
		});
		this.gewaehlteChecklisteSubject.next(kopie);
		this.checklistenSubject.next(geaenderteChecklisten);
	}

	updateChecklisteItems(items: ChecklistenItem[]) {
		const checkliste = this.gewaehlteChecklisteSubject.value;
		if (checkliste) {
			checkliste.items = items;
			this.updateCheckliste(checkliste);
		}
	}

	updateTemplateItems(items: ChecklisteTemplateItem[]) {

		const template = this.gewaehltesTemplateSubject.value;
		const kopie: ChecklisteTemplate = _.cloneDeep(template);
		kopie.items = items;
		this.updateTemplate(kopie);

	}

	updateTemplate(template: ChecklisteTemplate) {

		const kopie: ChecklisteTemplate = _.cloneDeep(template);

		const geaenderteTemplates = [];
		this.checklistenTemplatesSubject.value.forEach(element => {
			if (element.typ !== kopie.typ) {
				geaenderteTemplates.push(element);
			} else {
				geaenderteTemplates.push(kopie);
			}
		});

		this.gewaehltesTemplateSubject.next(kopie);
		this.checklistenTemplatesSubject.next(geaenderteTemplates);

	}

	getKuerzelGewaehlteCheckliste(): string {
		const checkliste: ChecklisteDaten = this.gewaehlteChecklisteSubject.value;
		return checkliste ? checkliste.kuerzel : undefined;
	}

	findChecklisteByKuerzel(kuerzel: string): ChecklisteDaten {
		const treffer = _.find(this.checklistenSubject.value, ['kuerzel', kuerzel]);
		if (treffer) {
			return treffer as ChecklisteDaten;
		}

		return undefined;
	}

	findTemplateByTyp(typ: string): ChecklisteTemplate {
		const treffer = _.find(this.checklistenTemplatesSubject.value, ['typ', typ]);
		if (treffer) {
			this.gewaehltesTemplateSubject.next(treffer);
			return treffer as ChecklisteTemplate;
		}

		return undefined;
	}

	updateClientAccessToken(token: string) {
		this.clientAccessTokenSubject.next(token);
	}

	updateApiVersion(version: string) {
		this.apiVersionSubject.next(version);
	}

	updateGewaehltesTemplate(template: ChecklisteTemplate) {
		this.gewaehltesTemplateSubject.next(template);
	}
}

export const store = new DataStore();

