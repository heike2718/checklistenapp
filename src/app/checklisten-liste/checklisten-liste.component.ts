import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten, MODUS_CONFIG } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Router } from '@angular/router';
import { ModalService } from '../shared/components/modal/modal.service';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  nameListe: string;

  constructor(private router: Router, private checklistenService: ChecklistenService, private modalService: ModalService) { }

  ngOnInit() {
    this.checklisten$ = store.checklisten$;
    this.loadChecklisten();
  }



  showFilename(): boolean {
    return !environment.production;
  }

  addListeDisabled(): boolean {
    return !this.nameListe || this.nameListe.trim().length === 0;
  }

  neueCheckliste(typ: string) {

    const checkliste$ = this.checklistenService.createNewCheckliste(typ, this.nameListe);
    checkliste$.subscribe(
      chl => {
        store.addCheckliste(chl);
        this.router.navigateByUrl('/checkliste/' + MODUS_CONFIG + '/' + chl.kuerzel);
      }
    );
  }

  loadChecklisten() {
    this.checklistenService.findAllChecklisten();
  }

  closeModalQuietly() {
    this.nameListe = undefined;
    this.modalService.close();
  }
}
