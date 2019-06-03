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

    formNeuesTeilVisible: boolean;

    constructor(private router: Router, private modalService: ModalService, private checklistenService: ChecklistenService) { }

    ngOnInit() {
        this.formNeuesTeilVisible = false;
        this.checkliste$ = store.gewaehlteCheckliste$;
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
            optional: false
        };
        checkliste.items.push(item);
        this.toggleFormNeuesTeilVisible();
    }

    addItemDisabled(): boolean {
        return !this.nameItem || this.nameItem.length === 0;
    }

    closeModalQuietly() {
        this.nameItem = undefined;
        this.kommentarItem = undefined;
        this.formNeuesTeilVisible = false;
        this.modalService.close();
    }

    save(checkliste: ChecklisteDaten) {
        this.formNeuesTeilVisible = false;
        this.checklistenService.saveCheckliste(checkliste, MODUS_CONFIG);
    }

    saveAndClose(checkliste: ChecklisteDaten) {
        this.save(checkliste);
        this.router.navigateByUrl('/listen');
    }

    delete(checkliste: ChecklisteDaten) {
        this.checklistenService.deleteCheckliste(checkliste);
        this.router.navigateByUrl('/listen');
    }
}
