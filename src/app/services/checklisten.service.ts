import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';


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
      kommentar: 'vom Jens'
    },
    {
      name: 'Mülltüten',
      markiert: true,
      optional: false,
      erledigt: true
    },
    {
      name: 'Lachs',
      markiert: true,
      optional: false,
      erledigt: false
    },
    {
      name: 'Klopapier',
      markiert: true,
      optional: false,
      erledigt: true
    },
    {
      name: 'Mülltüten',
      markiert: false,
      optional: false,
      erledigt: false
    },
    {
      name: 'Grafikkarte',
      markiert: true,
      optional: false,
      erledigt: false
    }
  ];


  constructor(private http: Http) { }

  findAllChecklisten(): Observable<ChecklisteDaten[]> {

    const url = environment.apiUrl + '/checklisten';

    // return this.http.get(url).pipe(
    //   map(res => <ChecklisteDaten[]>res.json().data)
    // );

    return of(this.mockedChecklisten);
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

