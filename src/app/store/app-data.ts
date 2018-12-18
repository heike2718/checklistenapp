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

  private gewaehlteCheckliste = new BehaviorSubject<ChecklisteDaten>(initialCheckliste);

  private checklisten = new BehaviorSubject<ChecklisteDaten[]>([]);

  private unbearbeiteteItems = new BehaviorSubject<ChecklistenItem[]>([]);

  private bearbeiteteItems = new BehaviorSubject<ChecklistenItem[]>([]);

  gewaehlteCheckliste$: Observable<ChecklisteDaten> = this.gewaehlteCheckliste.asObservable();

  checklisten$: Observable<ChecklisteDaten[]> = this.checklisten.asObservable();

  unbearbeiteteItems$: Observable<ChecklistenItem[]> = this.unbearbeiteteItems.asObservable();

  bearbeiteteItems$: Observable<ChecklistenItem[]> = this.bearbeiteteItems.asObservable();



  constructor() { }

  initChecklisten(alleChecklisten: ChecklisteDaten[]) {
    this.checklisten.next(_.cloneDeep(alleChecklisten));
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

    this.bearbeiteteItems.next(bearbeitet);
    this.unbearbeiteteItems.next(unbearbeitet);
    this.gewaehlteCheckliste.next(kopie);
  }
}

export const store = new DataStore();


