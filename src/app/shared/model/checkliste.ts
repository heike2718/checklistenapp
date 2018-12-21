
export const EINKAUFSLISTE = 'EINKAUFSLISTE';
export const PACKLISTE = 'PACKLISTE';
export const TODOS = 'TODOS';

export const MODUS_SCHROEDINGER = 'schroedinger';
export const MODUS_CONFIG = 'configuration';
export const MODUS_EXEC = 'execution';

export const LISTE_VORSCHLAEGE = 'vorschlagsliste';

export const LISTE_AUSGEWAEHLT = 'ausgewaehlt';


export interface ChecklistenItem {
    name: string;
    markiert: boolean;
    optional: boolean;
    erledigt: boolean;
    kommentar?: string;
}

export interface ChecklisteDaten {
    kuerzel: string;
    name?: string;
    typ: string;
    anzahlErledigt: number;
    items: ChecklistenItem[];
    version: number;
    modus: string;
}

export interface Filterkriterium {
    modus: string;
    semantik: string;
}




