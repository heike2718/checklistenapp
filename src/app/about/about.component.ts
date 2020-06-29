import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { AboutService } from '../services/about.service';
import { store } from '../store/app-data';

@Component({
	selector: 'chl-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

	version = environment.version;

	apiVersion$: Observable<string>;

	apiVersionSubscription: Subscription;

	apiUrl = environment.apiUrl;

	constructor(private aboutService: AboutService) {}

	ngOnInit() {

		this.apiVersion$ = store.apiVersion$;
		this.aboutService.loadAboutInfos();
	}

	ngOnDestroy() {
		if (this.apiVersionSubscription) {
			this.apiVersionSubscription.unsubscribe();
		}
	}

}
