import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Logger } from '@nsalaun/ng-logger';
import { MessagesService } from './messages.service';
import { Message, WARN, ERROR, ResponsePayload } from '../shared/model/message';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChecklistenService {

  constructor(private http: Http, private messagesService: MessagesService, private router: Router, private logger: Logger) { }

  loadChecklisten(): void {
    const url = environment.apiUrl + '/checklisten';

    const checklisten$ = this.http.get(url).pipe(
      map(res => <ResponsePayload>res.json()),
      publishLast(),
      refCount()
    );

    checklisten$.subscribe(
      payload => {
        if (payload.data) {
          const listen = payload.data;
          store.initChecklisten(listen);
          this.logger.debug('Anzahl Checklisten: ' + listen.length);
        }
      },
      (error => {
        this.handleError(error, 'findAllChecklisten');
      }));
  }


  createNewCheckliste(typ: string, name: string): void {

    const url = environment.apiUrl + '/checklisten';

    const checkliste: ChecklisteDaten = {
      kuerzel: 'neu',
      name: name,
      items: [],
      typ: typ,
      version: 0
    };

    this.logger.debug('vor dem Anlegen der Checkliste ' + JSON.stringify(checkliste));

    let neueListe: ChecklisteDaten;
    this.http.post(url, checkliste).pipe(
      map(res => <ResponsePayload>res.json()),
      publishLast(),
      refCount()
    ).subscribe(
      resp => {
        neueListe = resp.data;
        store.addCheckliste(neueListe);
      },
      (error => {
        this.handleError(error, 'createNewCheckliste');
      }));

    // return of(neueListe);
  }

  saveCheckliste(checkliste: ChecklisteDaten, modus: string): void {

    this.logger.debug('saveCheckliste: ' + JSON.stringify(checkliste));

    const url = environment.apiUrl + '/checklisten/' + checkliste.kuerzel;

    // Modus ist transient fürs Backend
    checkliste.modus = undefined;
    const potentielleCheckliste$ = this.http.put(url, checkliste).pipe(
      map(res => <ResponsePayload>res.json()),
      publishLast(),
      refCount()
    );

    potentielleCheckliste$.subscribe(
      resp => {
        if (resp.data) {
          const persistierte = resp.data;
          persistierte.modus = modus;
          store.updateCheckliste(persistierte);
        }
      },
      (error => {
        this.handleError(error, 'saveCheckliste');
      }));
  }

  deleteCheckliste(checkliste: ChecklisteDaten): void {

    // TODO: http
    const url = environment.apiUrl + '/checklisten/' + checkliste.kuerzel;

    const observable$ = this.http.delete(url).pipe(
      map(res => <Message>res.json().message),
      publishLast(),
      refCount()
    );

    observable$.subscribe(
      message => {
        store.deleteCheckliste(checkliste.kuerzel);
      },
      (error => {
        this.handleError(error, 'deleteCheckliste');
      }));
  }

  findChecklisteByKuerzel(kuerzel: string, modus: string): Observable<ChecklisteDaten> {

    this.logger.debug('findChecklisteByKuerzel called - [kuerzel=' + kuerzel + ', modus=' + modus + ']');


    const checkliste = store.findChecklisteByKuerzel(kuerzel);
    if (checkliste) {
      checkliste.modus = modus;
      store.updateCheckliste(checkliste);
      return of(checkliste);
    } else {
      const checkliste$ = this.loadCheckliste(kuerzel);
      checkliste$.subscribe(
        cl => {
          cl.modus = modus;
          store.updateCheckliste(cl);
        },
        (error => {
          this.handleError(error, 'findChecklisteByKuerzel');
        }));
    }

    return undefined;
  }

  private loadCheckliste(kuerzel: string): Observable<ChecklisteDaten> {
    const url = environment.apiUrl + '/checklisten/' + kuerzel;

    return this.http.get(url).pipe(
      map(res => <ChecklisteDaten>res.json()),
      publishLast(),
      refCount()
    );

  }



  private handleError(error: HttpErrorResponse, context: string) {

    if (error instanceof ErrorEvent) {
      this.logger.error(context + ': ErrorEvent occured - ' + JSON.stringify(error));
      throw (error);
    } else {
      switch (error.status) {
        case 0:
          this.messagesService.error(context +
            ': Server ist nicht erreichbar. Mögliche Ursachen: downtime oder CORS policy. Guckstu Browser- Log (F12)');
          break;
        case 401:
          this.showServerResponseMessage({
            level: 'ERROR',
            message: 'OMG - Not Found'
          });
          this.router.navigateByUrl('/listen');
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




