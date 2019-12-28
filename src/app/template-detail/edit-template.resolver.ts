import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ChecklisteTemplate } from '../shared/model/checkliste';
import { TemplateService } from '../services/template.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';



@Injectable({
	providedIn: 'root'
})
export class EditTemplateResolver implements Resolve<ChecklisteTemplate> {


	constructor(private templateService: TemplateService) { }

	resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<ChecklisteTemplate> {

		const typ = route.params.typ;
		return this.templateService.findTemplateByTyp(typ);
	}

}
