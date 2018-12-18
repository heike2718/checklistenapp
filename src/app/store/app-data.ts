import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChecklisteDaten, ChecklistenItem, MODUS_CONFIG, MODUS_EDIT, MODUS_SCHROEDINGER } from '../shared/model/checkliste';
import * as _ from 'lodash';

export const initialCheckliste: ChecklisteDaten = {
  typ: '',
  modus: MODUS_SCHROEDINGER,
  items: []
};



@Injectable({
  providedIn: 'root'
})
export class DataStore {

  private gewaehlteChecklisteSubject = new BehaviorSubject<ChecklisteDaten>(initialCheckliste);

  private checklistenSubject = new BehaviorSubject<ChecklisteDaten[]>([]);

  private unbearbeiteteItemsSubject = new BehaviorSubject<ChecklistenItem[]>([]);

  private bearbeiteteItemsSubject = new BehaviorSubject<ChecklistenItem[]>([]);

  gewaehlteCheckliste$: Observable<ChecklisteDaten> = this.gewaehlteChecklisteSubject.asObservable();

  checklisten$: Observable<ChecklisteDaten[]> = this.checklistenSubject.asObservable();

  unbearbeiteteItems$: Observable<ChecklistenItem[]> = this.unbearbeiteteItemsSubject.asObservable();

  bearbeiteteItems$: Observable<ChecklistenItem[]> = this.bearbeiteteItemsSubject.asObservable();



  constructor() { }

  initChecklisten(alleChecklisten: ChecklisteDaten[]) {
    this.checklistenSubject.next(_.cloneDeep(alleChecklisten));
  }

  updateCheckliste(checkliste: ChecklisteDaten) {
    const kopie: ChecklisteDaten = _.cloneDeep(checkliste);
    this.initGewaehlteCheckliste(kopie);
  }

  initGewaehlteCheckliste(checkliste: ChecklisteDaten) {
    const kopie: ChecklisteDaten = _.cloneDeep(checkliste);

    const unbearbeitet: ChecklistenItem[] = [];
    const bearbeitet: ChecklistenItem[] = [];

    kopie.items.forEach(item => {
      switch (kopie.modus) {
        case MODUS_CONFIG:
          if (item.markiert) {
            bearbeitet.push(item);
          } else {
            unbearbeitet.push(item);
          }
          break;
        case MODUS_EDIT:
          if (item.erledigt) {
            bearbeitet.push(item);
          } else {
            unbearbeitet.push(item);
          }
          break;
        case MODUS_SCHROEDINGER:
          break;
        default:
          console.error('unerwarteter modus ' + kopie.modus);
      }
    });

    this.bearbeiteteItemsSubject.next(bearbeitet);
    this.unbearbeiteteItemsSubject.next(unbearbeitet);
    this.gewaehlteChecklisteSubject.next(kopie);
  }
}

export const store = new DataStore();


