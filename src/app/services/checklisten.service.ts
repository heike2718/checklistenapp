import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, pipe, of } from 'rxjs';
import { map, publishLast, refCount, catchError } from 'rxjs/operators';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem, MODUS_SCHROEDINGER } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Logger } from '@nsalaun/ng-logger';
import { loadCheckliste, loadChecklisten, removeCheckliste, neueCheckliste } from './mockDb';
import { MessagesService } from './messages.service';
import { INFO, Message, WARN, ERROR } from '../shared/model/message';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChecklistenService {

  constructor(private http: Http, private messagesService: MessagesService, private logger: Logger) { }

  findAllChecklisten(): void {
    const url = environment.apiUrl + '/checklisten';

    // const checklisten$: Observable<ChecklisteDaten[]> = loadChecklisten();

    const checklisten$ = this.http.get(url).pipe(
      map(res => <ChecklisteDaten[]>res.json().data),
      publishLast(),
      refCount()
    );

    checklisten$.subscribe(
      listen => {
        store.initChecklisten(listen);
        this.logger.debug('Anzahl Checklisten: ' + listen.length);
      },
      (error => {
        this.handleError(error, 'Checklisten laden');
        // throw(error);
      }));
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

  createNewCheckliste(typ: string, name: string): Observable<ChecklisteDaten> {

    const url = environment.apiUrl + '/checklisten';

    const checkliste: ChecklisteDaten = {
      kuerzel: '8',
      name: name,
      anzahlErledigt: 0,
      items: [],
      typ: typ,
      version: 0
    };



    return neueCheckliste(typ);
  }

  saveCheckliste(checkliste: ChecklisteDaten): Observable<ChecklisteDaten> {
    return of(checkliste);
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


  private handleError(error: HttpErrorResponse, context: string) {

    if (error instanceof ErrorEvent) {
      this.logger.error(context + ': ErrorEvent occured - ' + JSON.stringify(error));
      throw(error);
    } else {
      switch (error.status) {
        case 0:
          this.messagesService.error(context +
            ': Server ist nicht erreichbar. Mögliche Ursachen: downtime oder CORS policy. Guckstu Browser- Log (F12)');
          break;
        default:

          if (error['_body']) {

            // so bekommt man den body als nettes kleines JSON-Objekt :)
            const body = JSON.parse(error['_body']);
            if (body['message']) {
              const msg = <Message>body['message'];
              this.showServerResponseMessage(msg);
            } else {
              this.messagesService.error(context + ' status=' + error.status
                + ': OMG +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++');
            }
          } else {
            this.messagesService.error(context + ' status=' + error.status
              + ': OMG +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++');
          }
      }
    }
  }

  private showServerResponseMessage(msg: Message) {
    switch (msg.level) {
      case WARN:
        this.messagesService.error(msg.message);
        break;
      case ERROR:
        this.messagesService.error(msg.message);
        break;
      default:
        this.messagesService.error('Unbekanntes message.level ' + msg.level + ' vom Server bekommen.');
    }
  }
}




