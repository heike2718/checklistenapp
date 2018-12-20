import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChecklisteDaten, MODUS_EDIT } from '../../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { ChecklistenService } from '../../services/checklisten.service';
import { store } from '../../store/app-data';

@Injectable({
  providedIn: 'root'
})
export class ExecuteChecklisteResolver implements Resolve<ChecklisteDaten> {

   constructor(private checklistenService: ChecklistenService) { }

  resolve(route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<ChecklisteDaten> {

    let checkliste$ = store.gewaehlteCheckliste$;

    this.checklistenService.loadChecklisteByKuerzel(route.params['kuerzel'], MODUS_EDIT);
    store.gewaehlteCheckliste$.subscribe(
      liste => checkliste$ = of(liste)
    );
    return checkliste$;
  }
}
