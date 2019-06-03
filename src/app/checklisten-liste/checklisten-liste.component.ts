import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { MessagesService, ModalService } from 'hewi-ng-lib';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  nameListe: string;

  constructor(private checklistenService: ChecklistenService,
    private modalService: ModalService,
    private messagesService: MessagesService) { }

  ngOnInit() {
    this.checklisten$ = store.checklisten$;
    this.loadChecklisten();
  }



  showFilename(): boolean {
    return !environment.production;
  }

  addListeDisabled(): boolean {
    return !this.nameListe || this.nameListe.trim().length <= 2;
  }

  neueCheckliste(typ: string) {
    this.messagesService.clear();
    this.modalService.close();
    this.checklistenService.createNewCheckliste(typ, this.nameListe);
  }

  loadChecklisten() {
    this.messagesService.clear();
    this.checklistenService.loadChecklisten();
  }

  closeModalQuietly() {
    this.messagesService.clear();
    this.nameListe = undefined;
    this.modalService.close();
  }
}
