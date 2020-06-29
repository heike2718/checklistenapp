import { Injectable, ErrorHandler, Injector } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService, LogService } from 'hewi-ng-lib';
import { LogPublishersService } from '../logger/log-publishers.service';
import { environment } from '../../environments/environment';
import { STORAGE_KEY_ID_REFERENCE } from '../shared/model/user';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	private logService: LogService;

	constructor(private injector: Injector) {

		// ErrorHandler wird vor allen anderen Injectables instanziiert,
		// so dass man benötigte Services nicht im Konstruktor injekten kann !!!

		const logPublishersService = this.injector.get(LogPublishersService);
		this.logService = this.injector.get(LogService);

		this.logService.initLevel(environment.loglevel);
		this.logService.registerPublishers(logPublishersService.publishers);
		this.logService.info('logging initialized: loglevel=' + environment.loglevel);
	}


	handleError(error: any): void {

		let message = 'Checklistenapp: unerwarteter Fehler aufgetreten: ';

		if (error.message) {
			message += error.message;
		}

		// try sending an Error-Log to the Server

		const idReference = localStorage.getItem(STORAGE_KEY_ID_REFERENCE);

		this.logService.error(message + ' (idRef=' + idReference + ')');

		if (error instanceof HttpErrorResponse) {
			this.logService.debug('das sollte nicht vorkommen, da diese Errors einem der services behandelt werden');
		} else {
			this.logService.error('Unerwarteter Fehler: ' + error.message + ' (idRef=' + idReference + ')');
		}

		this.injector.get(MessagesService).error(message);

		// const router = this.injector.get(Router);
		// router.navigateByUrl('/error');
	}
}



