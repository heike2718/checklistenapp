import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { MessagesService } from 'hewi-ng-lib';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  nameListe: string;

  formNeueChecklisteVisible: boolean;

  constructor(private checklistenService: ChecklistenService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.formNeueChecklisteVisible = false;
    this.checklisten$ = store.checklisten$;
    this.loadChecklisten();
  }

  showFilename(): boolean {
    return !environment.production;
  }

  addListeDisabled(): boolean {
    return !this.nameListe || this.nameListe.trim().length <= 2;
  }

  toggleFormNeueCheckliste() {
    this.formNeueChecklisteVisible = !this.formNeueChecklisteVisible;
  }

  neueCheckliste(typ: string) {
    this.messagesService.clear();
    this.toggleFormNeueCheckliste();
    this.checklistenService.createNewCheckliste(typ, this.nameListe);
    this.nameListe = '';
  }

  loadChecklisten() {
    this.messagesService.clear();
    this.checklistenService.loadChecklisten();
  }

  closeModalQuietly() {
    this.messagesService.clear();
    this.nameListe = undefined;
    this.toggleFormNeueCheckliste();
  }
}
