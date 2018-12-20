import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChecklisteDaten, MODUS_SCHROEDINGER, ChecklistenItem } from '../shared/model/checkliste';
import * as _ from 'lodash';

export const initialCheckliste: ChecklisteDaten = {
  typ: '',
  modus: MODUS_SCHROEDINGER,
  items: [],
  anzahlErledigt: 0
};



@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private gewaehlteChecklisteSubject = new BehaviorSubject<ChecklisteDaten>(initialCheckliste);

  private checklistenSubject = new BehaviorSubject<ChecklisteDaten[]>([]);

  gewaehlteCheckliste$: Observable<ChecklisteDaten> = this.gewaehlteChecklisteSubject.asObservable();

  checklisten$: Observable<ChecklisteDaten[]> = this.checklistenSubject.asObservable();



  constructor() { }

  initChecklisten(alleChecklisten: ChecklisteDaten[]) {
    this.checklistenSubject.next(_.cloneDeep(alleChecklisten));
  }

  updateCheckliste(checkliste: ChecklisteDaten) {
    const kopie: ChecklisteDaten = _.cloneDeep(checkliste);
    this.gewaehlteChecklisteSubject.next(kopie);
  }

  updateChecklisteItems(items: ChecklistenItem[]) {
    const checkliste = this.gewaehlteChecklisteSubject.value;
    if (checkliste) {
      checkliste.items = items;
      this.updateCheckliste(checkliste);
    }
  }

  getKuerzelGewaehlteCheckliste(): string {
    const checkliste: ChecklisteDaten = this.gewaehlteChecklisteSubject.value;
    return checkliste ? checkliste.kuerzel : undefined;
  }
}

export const store = new DataStore();


