import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS } from '../model/checkliste';


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



