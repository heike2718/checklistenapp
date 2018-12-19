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
      typ: EINKAUFSLISTE,
      items: [],
      modus: MODUS_SCHROEDINGER
    },
    {
      kuerzel: '2',
      name: 'Sommerurlaub',
      typ: PACKLISTE,
      items: [],
      modus: MODUS_SCHROEDINGER
    },
    {
      kuerzel: '3',
      name: 'Heiligabend',
      typ: EINKAUFSLISTE,
      items: [],
      modus: MODUS_SCHROEDINGER
    },
    {
      kuerzel: '4',
      name: 'Tasks',
      typ: TODOS,
      items: [],
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
        store.initChecklisten(listen);
        this.logger.debug('Anzahl Checklisten: ' + listen.length);
      });
  }

  getChecklisteByKuerzel(kuerzel: string, modus: string): void {

    // TODO: http + typ der Items setzen, denn die kommen nicht vom Server.

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
        checkliste = {
          items: [],
          modus: MODUS_SCHROEDINGER,
          typ: ''
        };
    }
    if (checkliste.modus !== MODUS_SCHROEDINGER) {
      checkliste.items = this.getMockedItems('');
    }
    checkliste.modus = modus;
    checkliste.items = this.getMockedItems(checkliste.typ);

    this.logger.debug('ChecklistenService: ' + JSON.stringify(checkliste));

    store.initGewaehlteCheckliste(checkliste);
  }

  private getMockedItems(theTyp: string): ChecklistenItem[] {
    const mockedItems: ChecklistenItem[] = [
      {
        name: 'Aprikosenschnaps',
        markiert: true,
        optional: true,
        erledigt: false,
        kommentar: 'vom Jens',
        typ: theTyp
      },
      {
        name: 'Mülltüten',
        markiert: true,
        optional: false,
        erledigt: true,
        typ: theTyp
      },
      {
        name: 'Lachs',
        markiert: true,
        optional: false,
        erledigt: false,
        typ: theTyp
      },
      {
        name: 'Klopapier',
        markiert: true,
        optional: false,
        erledigt: true,
        typ: theTyp
      },
      {
        name: 'Mülltüten',
        markiert: false,
        optional: false,
        erledigt: false,
        typ: theTyp
      },
      {
        name: 'Grafikkarte',
        markiert: true,
        optional: false,
        erledigt: false,
        typ: theTyp
      }
    ];

    return mockedItems;
  }

}


