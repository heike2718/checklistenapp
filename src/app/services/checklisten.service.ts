import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem, MODUS_SCHROEDINGER } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Logger } from '@nsalaun/ng-logger';
import { loadCheckliste, loadChecklisten, removeCheckliste } from './mockDb';
import { MessagesService } from './messages.service';
import { INFO } from '../shared/model/message';


@Injectable({
  providedIn: 'root'
})
export class ChecklistenService {

  constructor(private http: Http, private messagesService: MessagesService, private logger: Logger) { }

  findAllChecklisten(): void {
    const url = environment.apiUrl + '/checklisten';

    // return this.http.get(url).pipe(
    //   map(res => <ChecklisteDaten[]>res.json().data),
    //   publishLast(),
    //   refCount()
    // );

    const checklisten$: Observable<ChecklisteDaten[]> = loadChecklisten();

    checklisten$.subscribe(
      listen => {
        store.initChecklisten(listen);
        this.logger.debug('Anzahl Checklisten: ' + listen.length);
      });
  }

  loadChecklisteByKuerzel(kuerzel: string, modus: string): Observable<ChecklisteDaten> {

    this.logger.debug('loadChecklisteByKuerzel called - [kuerzel=' + kuerzel + ', modus=' + modus + ']');
    // TODO: http
    const checkliste$ = loadCheckliste(kuerzel, modus);

    checkliste$.subscribe(
      checkliste => store.updateCheckliste(checkliste)
    );

    return checkliste$;
  }

  deleteCheckliste(checkliste: ChecklisteDaten): void {

    // TODO: http

    const message$ = removeCheckliste(checkliste);

    message$.subscribe(
      msg => {
        this.messagesService.neueMessage(msg);

        if (INFO === msg.level) {
          store.deleteCheckliste(checkliste.kuerzel);
        }
      }
    );
  }
}




