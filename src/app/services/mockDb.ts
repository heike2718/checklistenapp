// tslint:disable-next-line:max-line-length
import { ChecklisteDaten, EINKAUFSLISTE, MODUS_SCHROEDINGER, PACKLISTE, TODOS, ChecklistenItem, MODUS_EXEC, MODUS_CONFIG } from '../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { Message, INFO } from '../shared/model/message';
import { initialCheckliste } from '../store/app-data';
import * as _ from 'lodash';



const MOCKED_CHECKLISTEN: ChecklisteDaten[] = [
    {
        kuerzel: '1',
        name: 'Sonntag',
        typ: EINKAUFSLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2,
        version: 3
    },
    {
        kuerzel: '2',
        name: 'Sommerurlaub',
        typ: PACKLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2,
        version: 1
    },
    {
        kuerzel: '3',
        name: 'Heiligabend',
        typ: EINKAUFSLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 0,
        version: 2
    },
    {
        kuerzel: '4',
        name: 'Tasks',
        typ: TODOS,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2,
        version: 6
    }
];

const MOCKED_ITEMS: ChecklistenItem[] = [
    {
        name: 'Aprikosenschnaps',
        markiert: true,
        optional: true,
        erledigt: false,
        kommentar: 'vom Jens'
    },
    {
        name: 'Mülltüten',
        markiert: true,
        optional: false,
        erledigt: true,
        kommentar: '20l'
    },
    {
        name: 'Lachs',
        markiert: false,
        optional: false,
        erledigt: false
    },
    {
        name: 'Klopapier',
        markiert: true,
        optional: false,
        erledigt: true
    },
    {
        name: 'Tomaten',
        markiert: false,
        optional: false,
        erledigt: false
    },
    {
        name: 'Grafikkarte',
        markiert: true,
        optional: false,
        erledigt: false
    },
    {
        name: 'Milch voll',
        markiert: true,
        optional: false,
        erledigt: false
    },
    {
        name: 'Quark',
        markiert: false,
        optional: false,
        erledigt: false
    },
    {
        name: 'Joghurt',
        markiert: true,
        optional: false,
        erledigt: false,
        kommentar: '2'
    }
];

function createCheckliste(typ: string): ChecklisteDaten {
const items = _.cloneDeep(MOCKED_ITEMS);
    items.forEach(
        it => {
            it.markiert = false;
            it.erledigt = false;
            it.kommentar = undefined;
            it.typ = typ;
        }
    );


    const checkliste: ChecklisteDaten = {
        kuerzel: '8',
        name: 'neu',
        anzahlErledigt: 0,
        modus: MODUS_CONFIG,
        items: items,
        typ: typ,
        version: 0
    };
    return checkliste;
}

export function loadChecklisten(): Observable<ChecklisteDaten[]> {
    return of(MOCKED_CHECKLISTEN);
}

export function loadCheckliste(kuerzel: string, modus: string): Observable<ChecklisteDaten> {

    // TODO: http

    let checkliste: ChecklisteDaten;
    switch (kuerzel) {
        case '1':
            checkliste = MOCKED_CHECKLISTEN[0];
            checkliste.items = MOCKED_ITEMS;
            break;
        case '2':
            checkliste = MOCKED_CHECKLISTEN[1];
            checkliste.items = MOCKED_ITEMS;
            break;
        case '3':
            checkliste = MOCKED_CHECKLISTEN[2];
            checkliste.items = MOCKED_ITEMS;
            break;
        case '4':
            checkliste = MOCKED_CHECKLISTEN[3];
            checkliste.items = MOCKED_ITEMS;
            break;
        default:
            checkliste = createCheckliste(EINKAUFSLISTE);
    }
    checkliste.modus = modus;
    return of(checkliste);
}

export function neueCheckliste(typ: string): Observable<ChecklisteDaten> {
    return of(createCheckliste(typ));
}

export function removeCheckliste(checkliste: ChecklisteDaten): Observable<Message> {

    const message: Message = {
        level: INFO,
        message: 'Löschen erfolgreich: kuerzel=' + checkliste.kuerzel
    };

    return of(message);
}
