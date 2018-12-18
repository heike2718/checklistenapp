import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChecklisteDaten, ChecklistenItem } from '../shared/model/checkliste';
import * as _ from 'lodash';

const initialCheckliste: ChecklisteDaten = {
  typ: ''
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

  initializeChecklisten(alleChecklisten: ChecklisteDaten[]) {
    this.checklisten.next(_.cloneDeep(alleChecklisten));
  }
}

export const store = new DataStore();


