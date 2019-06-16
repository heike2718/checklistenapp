import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, Filterkriterium, MODUS_CONFIG, LISTE_AUSGEWAEHLT, ChecklistenItem } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ChecklistenService } from '../../services/checklisten.service';
import { filterChecklisteItems } from '../../shared/utils/checkliste.utils';
import { ModalService } from 'hewi-ng-lib';

@Component({
	selector: 'chl-configure-checkliste',
	templateUrl: './configure-checkliste.component.html',
	styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

	checkliste$: Observable<ChecklisteDaten>;

	nameItem: string;

	kommentarItem: string;

	optinalItem: boolean;

	formNeuesTeilVisible: boolean;

	constructor(private router: Router, private checklistenService: ChecklistenService, private modalService: ModalService) { }

	ngOnInit() {
		this.formNeuesTeilVisible = false;
		this.checkliste$ = store.gewaehlteCheckliste$;
		this.nameItem = '';
		this.kommentarItem = '';
		this.optinalItem = false;
	}

	toggleFormNeuesTeilVisible() {
		this.formNeuesTeilVisible = !this.formNeuesTeilVisible;
	}


	showFilename(): boolean {
		return !environment.production;
	}

	saveDisabled(checkliste: ChecklisteDaten): boolean {
		if (!checkliste.name || checkliste.name.length === 0) {
			return true;
		}
		const kriterium: Filterkriterium = {
			modus: MODUS_CONFIG,
			semantik: LISTE_AUSGEWAEHLT
		};

		const ausgewaehlteItems = filterChecklisteItems(checkliste.items, kriterium);
		if (ausgewaehlteItems.length === 0) {
			return true;
		}
		return false;
	}

	addItem(checkliste: ChecklisteDaten): void {
		const item: ChecklistenItem = {
			name: this.nameItem,
			kommentar: this.kommentarItem,
			erledigt: false,
			markiert: true,
			optional: this.optinalItem
		};
		checkliste.items.push(item);
		this.nameItem = '';
		this.kommentarItem = '';
		this.toggleFormNeuesTeilVisible();
	}

	addItemDisabled(): boolean {
		return !this.nameItem || this.nameItem.length === 0;
	}

	save(checkliste: ChecklisteDaten) {
		this.formNeuesTeilVisible = false;
		this.checklistenService.saveCheckliste(checkliste, MODUS_CONFIG, true);
	}

	saveAndClose(checkliste: ChecklisteDaten) {
		this.formNeuesTeilVisible = false;
		this.checklistenService.saveCheckliste(checkliste, MODUS_CONFIG, false);
		this.router.navigateByUrl('/listen');
	}

	closeModalQuietly() {
		this.modalService.close();
	}

	delete(checkliste: ChecklisteDaten) {
		this.checklistenService.deleteCheckliste(checkliste);
		this.router.navigateByUrl('/listen');
	}
}
