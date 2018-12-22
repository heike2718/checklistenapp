import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ChecklistenService } from '../../services/checklisten.service';

@Component({
  selector: 'chl-execute-checkliste',
  templateUrl: './execute-checkliste.component.html',
  styleUrls: ['./execute-checkliste.component.css']
})
export class ExecuteChecklisteComponent implements OnInit {

  checkliste$: Observable<ChecklisteDaten>;

  constructor(private router: Router, private checklistenService: ChecklistenService) { }

  ngOnInit() {
    this.checkliste$ = store.gewaehlteCheckliste$;
  }

  showFilename(): boolean {
    return !environment.production;
  }

  save(checkliste: ChecklisteDaten) {
    this.checklistenService.saveCheckliste(checkliste).subscribe(
      chl => store.updateCheckliste(chl)
    );
  }

  saveAndClose(checkliste: ChecklisteDaten) {
    this.checklistenService.saveCheckliste(checkliste).subscribe(
      chl => {
        store.updateCheckliste(chl); this.router.navigateByUrl('/listen');
      }
    );
  }
}
