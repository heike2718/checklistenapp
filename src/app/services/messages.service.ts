import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Message, ERROR } from '../shared/model/message';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private infoSubject = new BehaviorSubject<string>('');
  private warnSubject = new BehaviorSubject<string>('');
  private errorSubject = new BehaviorSubject<string>('');


  info$: Observable<string> = this.infoSubject.asObservable();
  warn$: Observable<string> = this.warnSubject.asObservable();
  error$: Observable<string> = this.errorSubject.asObservable();



  constructor() {}

  info(message: string) {
    this.infoSubject.next(message);
  }

  warn(message: string) {
    this.warnSubject.next(message);
  }

  error(message: string) {
    this.errorSubject.next(message);
  }
}
