import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorService } from '../error/http-error.service';
import { LogService, ResponsePayload, MessagesService } from 'hewi-ng-lib';
import { environment } from '../../environments/environment';
import { map, publishLast, refCount } from 'rxjs/operators';
import { store } from '../store/app-data';
import { ChecklisteTemplate } from '../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class TemplateService {

	constructor(private http: HttpClient
		, private httpErrorService: HttpErrorService
		, private messagesService: MessagesService
		, private logger: LogService
		, private router: Router) { }



	loadTemplates(): void {
		const url = environment.apiUrl + '/templates';

		this.http.get(url).pipe(
			map(res => res as ResponsePayload),
			publishLast(),
			refCount()
		).subscribe(
			payload => {
				if (payload.data) {
					const trefferliste = payload.data;
					store.initTemplates(trefferliste);
					this.logger.debug('Anzahl Templates: ' + trefferliste.length);
				}
			},
			(error => this.httpErrorService.handleError(error, 'loadTemplates'))
		);
	}

	findTemplateByTyp(typ: string): Observable<ChecklisteTemplate> {

		const template = store.findTemplateByTyp(typ);
		if (template) {
			return of(template);
		} else {
			const template$ = this.loadTemplateByTyp(typ);
			template$.pipe(
				map(res => res as ResponsePayload)
			).subscribe(
				(payload: ResponsePayload) => {
					const data: ChecklisteTemplate = payload.data;
					store.updateTemplate(data);
					return of(data);
				},
				((error: HttpErrorResponse) => {
					this.httpErrorService.handleError(error, 'findTemplateByTyp');
				}));
		}

		return undefined;
	}

	loadTemplateByTyp(typ: string): Observable<any> {
		const url = environment.apiUrl + '/templates/' + typ;

		return this.http.get(url);
	}

	saveTemplate(template: ChecklisteTemplate, close: boolean) {

		const url = environment.apiUrl + '/templates';

		this.http.post(url, template).pipe(
			map(res => res as ResponsePayload),
			publishLast(),
			refCount()
		).subscribe(
			payload => {

				if (payload.data) {
					const persistiertesTemplate = payload.data;
					store.updateTemplate(persistiertesTemplate);
					if (!close) {
						this.messagesService.info(payload.message.message);
					} else {
						this.router.navigateByUrl('/templates');
					}
				}

			},
			(error => this.httpErrorService.handleError(error, 'saveTemplate'))

		);

	}
}
