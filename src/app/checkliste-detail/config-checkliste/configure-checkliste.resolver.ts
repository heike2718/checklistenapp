import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChecklisteDaten, MODUS_CONFIG } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { ChecklistenService } from '../../services/checklisten.service';

@Injectable({
	providedIn: 'root'
})
export class ConfigureChecklisteResolver implements Resolve<ChecklisteDaten> {

	constructor(private checklistenService: ChecklistenService) { }



	resolve(route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot): Observable<ChecklisteDaten> {
		const kuerzel = route.params['kuerzel'];
		return this.checklistenService.findChecklisteByKuerzel(kuerzel, MODUS_CONFIG);
	}
}
