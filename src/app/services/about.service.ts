import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponsePayload } from 'hewi-ng-lib';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { store } from '../store/app-data';

@Injectable({
	providedIn: 'root'
})
export class AboutService {

	constructor(private httpClient: HttpClient) { }

	loadAboutInfos(): void {

		const url = environment.apiUrl + '/version';

		this.httpClient.get(url).pipe(
			map(res => res as ResponsePayload)).subscribe(
				pl => {
					store.updateApiVersion(pl.message.message);
				},
				(_error => {
					store.updateApiVersion('');
				}));

	}


}
