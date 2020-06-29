import { Component, Input } from '@angular/core';
import { ChecklisteTemplate } from '../shared/model/checkliste';
import { Router } from '@angular/router';
import { TemplateService } from '../services/template.service';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';

@Component({
	selector: 'chl-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.css']
})
export class TemplateComponent {

	@Input()
	template: ChecklisteTemplate;

	showFilename = false;

	constructor(private router: Router
		, private templateService: TemplateService) {

			if (!environment.production) {
				this.showFilename = true;
			}
		 }


	clear() {
		this.template.items = [];
		this.templateService.saveTemplate(this.template, false);
	}

	edit() {
		store.updateGewaehltesTemplate(this.template);
		this.router.navigateByUrl('/template/' + this.template.typ);
	}

}
