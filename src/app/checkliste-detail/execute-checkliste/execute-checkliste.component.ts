import { Component, OnInit, Inject } from '@angular/core';
import { ChecklisteDaten, MODUS_EXEC } from '../../shared/model/checkliste';
import { Observable } from 'rxjs';
import { store } from '../../store/app-data';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ChecklistenService } from '../../services/checklisten.service';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'chl-execute-checkliste',
	templateUrl: './execute-checkliste.component.html',
	styleUrls: ['./execute-checkliste.component.css']
})
export class ExecuteChecklisteComponent implements OnInit {

	checkliste$: Observable<ChecklisteDaten>;

	constructor(private router: Router
		, @Inject(DOCUMENT) private document: Document
		, private checklistenService: ChecklistenService) { }

	ngOnInit() {
		this.checkliste$ = store.gewaehlteCheckliste$;
	}

	showFilename(): boolean {
		return !environment.production;
	}

	save(checkliste: ChecklisteDaten) {
		this.checklistenService.saveCheckliste(checkliste, MODUS_EXEC, true);
		this.document.body.scrollTop = 0;
	}

	saveAndClose(checkliste: ChecklisteDaten) {
		this.checklistenService.saveCheckliste(checkliste, MODUS_EXEC, false);
		this.router.navigateByUrl('/listen');
	}
}
