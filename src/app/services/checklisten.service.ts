import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Message, ResponsePayload, MessagesService, LogService } from 'hewi-ng-lib';
import { HttpErrorService } from '../error/http-error.service';


@Injectable({
	providedIn: 'root'
})
export class ChecklistenService {

	constructor(private http: HttpClient
		, private httpErrorService: HttpErrorService
		, private messagesService: MessagesService
		, private logger: LogService) { }

	loadChecklisten(): void {
		const url = environment.apiUrl + '/checklisten';

		const checklisten$ = this.http.get(url).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		);

		checklisten$.subscribe(
			payload => {
				if (payload.data) {
					const listen = payload.data;
					store.initChecklisten(listen);
					this.logger.debug('Anzahl Checklisten: ' + listen.length);
				}
			},
			(error => {
				this.httpErrorService.handleError(error, 'findAllChecklisten');
			}));
	}


	createNewCheckliste(typ: string, name: string): void {

		const url = environment.apiUrl + '/checklisten';

		const checkliste: ChecklisteDaten = {
			kuerzel: 'neu',
			name: name,
			items: [],
			typ: typ,
			version: 0
		};

		this.logger.debug('vor dem Anlegen der Checkliste ' + JSON.stringify(checkliste));

		let neueListe: ChecklisteDaten;
		this.http.post(url, checkliste).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			resp => {
				neueListe = resp.data;
				store.addCheckliste(neueListe);
			},
			(error => {
				this.httpErrorService.handleError(error, 'createNewCheckliste');
			}));

		// return of(neueListe);
	}

	saveCheckliste(checkliste: ChecklisteDaten, modus: string, showMessage: boolean): void {

		this.logger.debug('saveCheckliste: ' + JSON.stringify(checkliste));

		const url = environment.apiUrl + '/checklisten/' + checkliste.kuerzel;

		// Modus ist transient fürs Backend
		checkliste.modus = undefined;
		const potentielleCheckliste$ = this.http.put(url, checkliste).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		);

		potentielleCheckliste$.subscribe(
			resp => {
				if (resp.data) {
					const persistierte = resp.data;
					persistierte.modus = modus;
					store.updateCheckliste(persistierte);
					if (showMessage) {
						this.messagesService.info(resp.message.message);
					}
				}
			},
			(error => {
				this.httpErrorService.handleError(error, 'saveCheckliste');
			}));
	}

	deleteCheckliste(checkliste: ChecklisteDaten): void {

		// TODO: http
		const url = environment.apiUrl + '/checklisten/' + checkliste.kuerzel;

		const observable$ = this.http.delete(url).pipe(
			map(res => <Message>res),
			publishLast(),
			refCount()
		);

		observable$.subscribe(
			_message => {
				store.deleteCheckliste(checkliste.kuerzel);
			},
			(error => {
				this.httpErrorService.handleError(error, 'deleteCheckliste');
			}));
	}

	findChecklisteByKuerzel(kuerzel: string, modus: string): Observable<ChecklisteDaten> {

		this.logger.debug('findChecklisteByKuerzel called - [kuerzel=' + kuerzel + ', modus=' + modus + ']');


		const checkliste = store.findChecklisteByKuerzel(kuerzel);
		if (checkliste) {
			checkliste.modus = modus;
			store.updateCheckliste(checkliste);
			return of(checkliste);
		} else {
			const checkliste$ = this.loadCheckliste(kuerzel);
			checkliste$.subscribe(
				cl => {
					cl.modus = modus;
					store.updateCheckliste(cl);
				},
				(error => {
					this.httpErrorService.handleError(error, 'findChecklisteByKuerzel');
				}));
		}

		return undefined;
	}

	private loadCheckliste(kuerzel: string): Observable<ChecklisteDaten> {
		const url = environment.apiUrl + '/checklisten/' + kuerzel;

		return this.http.get(url).pipe(
			map(res => <ChecklisteDaten>res),
			publishLast(),
			refCount()
		);
	}
}

