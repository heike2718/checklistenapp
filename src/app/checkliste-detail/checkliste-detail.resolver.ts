import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { ChecklistenService } from '../services/checklisten.service';
import { store } from '../store/app-data';

@Injectable({
  providedIn: 'root'
})
export class ChecklisteDetailResolver implements Resolve<ChecklisteDaten> {

  constructor(private checklistenService: ChecklistenService) { }



  resolve(route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<ChecklisteDaten> {

    let checkliste$ = store.gewaehlteCheckliste$;

    const modus = route.params['modus'];

    this.checklistenService.getChecklisteByKuerzel(route.params['kuerzel'], modus);
    store.gewaehlteCheckliste$.subscribe(
      liste => checkliste$ = of(liste)
    );
    return checkliste$;
  }
}
