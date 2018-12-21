import { Component, OnInit } from '@angular/core';
import { ChecklistenService } from '../services/checklisten.service';
import { Observable } from 'rxjs';
import { ChecklisteDaten, MODUS_CONFIG } from '../shared/model/checkliste';
import { environment } from '../../environments/environment';
import { store } from '../store/app-data';
import { Router } from '@angular/router';

@Component({
  selector: 'chl-checklisten-liste',
  templateUrl: './checklisten-liste.component.html',
  styleUrls: ['./checklisten-liste.component.css']
})
export class ChecklistenListeComponent implements OnInit {

  checklisten$: Observable<ChecklisteDaten[]>;

  constructor(private router: Router, private checklistenService: ChecklistenService) { }

  ngOnInit() {
    this.checklisten$ = store.checklisten$;
  }



  showFilename(): boolean {
    return !environment.production;
  }

  neueCheckliste(typ: string) {

    const checkliste$ = this.checklistenService.createNewCheckliste(typ);
    checkliste$.subscribe(
      chl => {
        store.addCheckliste(chl);
        this.router.navigateByUrl('/checkliste/' + MODUS_CONFIG + '/' + chl.kuerzel);
      }
    );
  }
}
