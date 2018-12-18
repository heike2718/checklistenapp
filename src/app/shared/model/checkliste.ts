
export const EINKAUFSLISTE = 'EINKAUFSLISTE';
export const PACKLISTE = 'PACKLISTE';
export const TODOS = 'TODOS';

export const MODUS_SCHROEDINGER = 'schroedinger mode';
export const MODUS_CONFIG = 'configuration mode';
export const MODUS_EDIT = 'edit mode';

export interface ChecklistenItem {
    name: string;
    markiert: boolean;
    optional: boolean;
    erledigt: boolean;
    kommentar?: string;
    modus: string;
}

export interface ChecklisteDaten {
    kuerzel?: string;
    name?: string;
    typ: string;
    items?: ChecklistenItem[];
}




