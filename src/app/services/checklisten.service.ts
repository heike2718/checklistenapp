import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem, MODUS_SCHROEDINGER } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Logger } from '@nsalaun/ng-logger';


@Injectable({
  providedIn: 'root'
})
export class ChecklistenService {

  private mockedChecklisten: ChecklisteDaten[] = [
    {
      kuerzel: '1',
      name: 'Sonntag',
      typ: EINKAUFSLISTE
    },
    {
      kuerzel: '2',
      name: 'Sommerurlaub',
      typ: PACKLISTE
    },
    {
      kuerzel: '3',
      name: 'Heiligabend',
      typ: EINKAUFSLISTE
    },
    {
      kuerzel: '4',
      name: 'Tasks',
      typ: TODOS
    }
  ];

  private mockedItems: ChecklistenItem[] = [
    {
      name: 'Aprikosenschnaps',
      markiert: true,
      optional: true,
      erledigt: false,
      kommentar: 'vom Jens',
      modus: MODUS_SCHROEDINGER
    },
    {
      name: 'Mülltüten',
      markiert: true,
      optional: false,
      erledigt: true,
      modus: MODUS_SCHROEDINGER
    },
    {
      name: 'Lachs',
      markiert: true,
      optional: false,
      erledigt: false,
      modus: MODUS_SCHROEDINGER
    },
    {
      name: 'Klopapier',
      markiert: true,
      optional: false,
      erledigt: true,
      modus: MODUS_SCHROEDINGER
    },
    {
      name: 'Mülltüten',
      markiert: false,
      optional: false,
      erledigt: false,
      modus: MODUS_SCHROEDINGER
    },
    {
      name: 'Grafikkarte',
      markiert: true,
      optional: false,
      erledigt: false,
      modus: MODUS_SCHROEDINGER
    }
  ];


  constructor(private http: Http, private logger: Logger) { }

  findAllChecklisten(): void {

    const url = environment.apiUrl + '/checklisten';

    // return this.http.get(url).pipe(
    //   map(res => <ChecklisteDaten[]>res.json().data),
    //   publishLast(),
    //   refCount()
    // );

    const checklisten$: Observable<ChecklisteDaten[]> = of(this.mockedChecklisten);

    checklisten$.subscribe(
      listen => {
        store.initializeChecklisten(listen);
        this.logger.debug('Anzahl Checklisten: ' + listen.length);
      });
  }

  getChecklisteByKuerzel(kuerzel: string): Observable<ChecklisteDaten> {

    let checkliste: ChecklisteDaten;
    switch (kuerzel) {
      case '1':
        checkliste = this.mockedChecklisten[0];
        break;
      case '2':
        checkliste = this.mockedChecklisten[1];
        break;
      case '3':
        checkliste = this.mockedChecklisten[2];
        break;
      case '4':
        checkliste = this.mockedChecklisten[3];
        break;
      default:
        return of(undefined);
    }
    checkliste.items = this.mockedItems;
    return of(checkliste);
  }
}

