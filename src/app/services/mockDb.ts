import { ChecklisteDaten, EINKAUFSLISTE, MODUS_SCHROEDINGER, PACKLISTE, TODOS, ChecklistenItem } from '../shared/model/checkliste';
import { Observable, of } from 'rxjs';
import { Message, INFO } from '../shared/model/message';

const MOCKED_CHECKLISTEN: ChecklisteDaten[] = [
    {
        kuerzel: '1',
        name: 'Sonntag',
        typ: EINKAUFSLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2
    },
    {
        kuerzel: '2',
        name: 'Sommerurlaub',
        typ: PACKLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2
    },
    {
        kuerzel: '3',
        name: 'Heiligabend',
        typ: EINKAUFSLISTE,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2
    },
    {
        kuerzel: '4',
        name: 'Tasks',
        typ: TODOS,
        items: [],
        modus: MODUS_SCHROEDINGER,
        anzahlErledigt: 2
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
        erledigt: true
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
    }
];

export function loadChecklisten(): Observable<ChecklisteDaten[]> {
    return of(MOCKED_CHECKLISTEN);
}

export function loadCheckliste(kuerzel: string, modus: string): Observable<ChecklisteDaten> {

    // TODO: http

    let checkliste: ChecklisteDaten;
    switch (kuerzel) {
        case '1':
            checkliste = MOCKED_CHECKLISTEN[0];
            break;
        case '2':
            checkliste = MOCKED_CHECKLISTEN[1];
            break;
        case '3':
            checkliste = MOCKED_CHECKLISTEN[2];
            break;
        case '4':
            checkliste = MOCKED_CHECKLISTEN[3];
            break;
        default:
            checkliste = {
                items: [],
                modus: MODUS_SCHROEDINGER,
                typ: '',
                anzahlErledigt: 0
            };
    }
    checkliste.modus = modus;
    checkliste.items = MOCKED_ITEMS;
    return of(checkliste);
}

export function removeCheckliste(checkliste: ChecklisteDaten): Observable<Message> {

    const message: Message = {
        level: INFO,
        message: 'Löschen erfolgreich: kuerzel=' + checkliste.kuerzel
    };

    return of(message);

}
