import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { Observable } from 'rxjs';
import { ChecklistenService } from '../services/checklisten.service';

@Injectable({
  providedIn: 'root'
})
export class ChecklisteDetailResolver implements Resolve<ChecklisteDaten> {
  constructor(private checklistenService: ChecklistenService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<ChecklisteDaten> {

    return this.checklistenService.getChecklisteByKuerzel(route.params['kuerzel']);
  }
}
