import { Injectable, ErrorHandler, Injector } from '@angular/core';
// import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService, LogService } from 'hewi-ng-lib';
import { SessionService } from '../services/session.service';
import { LogPublishersService } from '../logger/log-publishers.service';
import { environment } from 'src/environments/environment';
import { STORAGE_KEY_CLIENT_ACCESS_TOKEN } from '../shared/model/oauth.model';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

	private logService: LogService;
	private sessionService: SessionService;

	constructor(private injector: Injector) {

		// ErrorHandler wird vor allen anderen Injectables instanziiert,
		// so dass man benötigte Services nicht im Konstruktor injekten kann !!!

		const logPublishersService = this.injector.get(LogPublishersService);
		this.logService = this.injector.get(LogService);

		this.logService.initLevel(environment.loglevel);
		this.logService.registerPublishers(logPublishersService.publishers);
		this.logService.info('logging initialized: loglevel=' + environment.loglevel);

		this.sessionService = this.injector.get(SessionService);
		this.logService.info('sessionService initialized');
	}


	handleError(error: any): void {

		let message = 'Checklistenapp: unerwarteter Fehler aufgetreten: ';

		if (error.message) {
			message += error.message;
		}

		// try sending an Error-Log to the Server
		this.logService.error(message, this.sessionService.getClientAccessToken());

		if (error instanceof HttpErrorResponse) {
			this.logService.debug('das sollte nicht vorkommen, da diese Errors einem der services behandelt werden');
		} else {
			const accessToken = sessionStorage.getItem(STORAGE_KEY_CLIENT_ACCESS_TOKEN);
			this.logService.error('Unerwarteter Fehler: ' + error.message, accessToken);
		}

		this.injector.get(MessagesService).error(message);

		// const router = this.injector.get(Router);
		// router.navigateByUrl('/error');
	}
}



