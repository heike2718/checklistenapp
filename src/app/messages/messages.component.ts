import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'chl-messages',
  templateUrl: './messages.component.html',
  styles: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  info$: Observable<string>;
  warn$: Observable<string>;
  error$: Observable<string>;


  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.info$ = this.messagesService.info$;
    this.warn$ = this.messagesService.warn$;
    this.error$ = this.messagesService.error$;
  }

  closeInfo() {
    this.messagesService.info(undefined);
  }

  closeWarn() {
    this.messagesService.warn(undefined);
  }

  closeErrors() {
    this.messagesService.error(undefined);
  }
}
