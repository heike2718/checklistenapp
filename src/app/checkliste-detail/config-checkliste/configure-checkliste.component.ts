import { Component, OnInit } from '@angular/core';
import { ChecklisteDaten, Filterkriterium, MODUS_CONFIG, LISTE_AUSGEWAEHLT, ChecklistenItem } from '../../shared/model/checkliste';
import { store } from '../../store/app-data';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ChecklistenService } from '../../services/checklisten.service';
import { filterChecklisteItems } from '../../shared/utils/checkliste.utils';
import { ModalService } from '../../shared/components/modal/modal.service';

@Component({
    selector: 'chl-configure-checkliste',
    templateUrl: './configure-checkliste.component.html',
    styleUrls: ['./configure-checkliste.component.css']
})
export class ConfigureChecklisteComponent implements OnInit {

    checkliste$: Observable<ChecklisteDaten>;

    nameItem: string;

    kommentarItem: string;

    constructor(private router: Router, private modalService: ModalService, private checklistenService: ChecklistenService) { }

    ngOnInit() {
        this.checkliste$ = store.gewaehlteCheckliste$;
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
        this.closeModalQuietly();
    }

    addItemDisabled(): boolean {
        return !this.nameItem || this.nameItem.length === 0;
    }

    closeModalQuietly() {
        this.nameItem = undefined;
        this.kommentarItem = undefined;
        this.modalService.close();
    }

    save(checkliste: ChecklisteDaten) {

    }

    saveAndClose(checkliste: ChecklisteDaten) {
        this.router.navigateByUrl('/listen');
    }

    delete(checkliste: ChecklisteDaten) {
        this.router.navigateByUrl('/listen');
    }
}
