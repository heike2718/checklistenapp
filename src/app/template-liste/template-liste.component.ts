import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChecklisteTemplate } from '../shared/model/checkliste';
import { TemplateService } from '../services/template.service';
import { store } from '../store/app-data';
import { MessagesService } from 'hewi-ng-lib';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'chl-template-liste',
	templateUrl: './template-liste.component.html',
	styleUrls: ['./template-liste.component.css']
})
export class TemplateListeComponent implements OnInit {

	templates$: Observable<ChecklisteTemplate[]>;



	constructor(private templateService: TemplateService, private messagesService: MessagesService) { }

	ngOnInit() {

		this.templates$ = store.templates$;
		this.loadTemplates();

	}

	loadTemplates(): void {
		this.messagesService.clear();
		this.templateService.loadTemplates();
	}

	showFilename(): boolean {
		return !environment.production;
	}

}
