import * as _ from 'lodash';
import { Observable } from 'rxjs';
// tslint:disable-next-line:max-line-length
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem, MODUS_CONFIG, MODUS_EDIT, MODUS_SCHROEDINGER } from '../model/checkliste';


export function getBackgroundColorByChecklistentyp(typ: string) {
    switch (typ) {
        case EINKAUFSLISTE:
            return 'bisque';
        case PACKLISTE:
            return 'lavender';
        case TODOS:
            return 'aqua';
    }

    return 'green';
}

export function getUnbearbeiteteItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
    const unbearbeitet: ChecklistenItem[] = [];

    checkliste.items.forEach(item => {
      switch (checkliste.modus) {
        case MODUS_CONFIG:
          if (!item.markiert) {
            unbearbeitet.push(item);
          }
          break;
        case MODUS_EDIT:
          if (!item.erledigt) {
            unbearbeitet.push(item);
          }
          break;
        case MODUS_SCHROEDINGER:
          break;
        default:
          console.error('unerwarteter modus ' + checkliste.modus);
      }
    });

    return unbearbeitet;
}

export function getBarbeiteteItems(checkliste: ChecklisteDaten): ChecklistenItem[] {
    const bearbeitet: ChecklistenItem[] = [];

    checkliste.items.forEach(item => {
      switch (checkliste.modus) {
        case MODUS_CONFIG:
          if (item.markiert) {
            bearbeitet.push(item);
          }
          break;
        case MODUS_EDIT:
          if (item.erledigt) {
            bearbeitet.push(item);
          }
          break;
        case MODUS_SCHROEDINGER:
          break;
        default:
          console.error('unerwarteter modus ' + checkliste.modus);
      }
    });
    return bearbeitet;
}



