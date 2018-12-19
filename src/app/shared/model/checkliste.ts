
export const EINKAUFSLISTE = 'EINKAUFSLISTE';
export const PACKLISTE = 'PACKLISTE';
export const TODOS = 'TODOS';

export const MODUS_SCHROEDINGER = 'schroedinger';
export const MODUS_CONFIG = 'config';
export const MODUS_EDIT = 'edit';

export interface ChecklistenItem {
    name: string;
    markiert: boolean;
    optional: boolean;
    erledigt: boolean;
    kommentar?: string;
    typ: string;
}

export interface ChecklisteDaten {
    kuerzel?: string;
    name?: string;
    typ: string;
    items: ChecklistenItem[];
    modus: string;
}




