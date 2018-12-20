import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChecklisteDaten, MODUS_CONFIG } from '../../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { ChecklistenService } from '../../services/checklisten.service';
import { store } from '../../store/app-data';

@Injectable({
  providedIn: 'root'
})
export class ConfigureChecklisteResolver implements Resolve<ChecklisteDaten> {

  constructor(private checklistenService: ChecklistenService) { }



  resolve(route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<ChecklisteDaten> {

    let checkliste$ = store.gewaehlteCheckliste$;

    this.checklistenService.loadChecklisteByKuerzel(route.params['kuerzel'], MODUS_CONFIG);
    store.gewaehlteCheckliste$.subscribe(
      liste => checkliste$ = of(liste)
    );
    return checkliste$;
  }
}
