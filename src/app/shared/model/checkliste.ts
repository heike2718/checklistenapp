
export const EINKAUFSLISTE = 'EINKAUFSLISTE';
export const PACKLISTE = 'PACKLISTE';
export const TODOS = 'TODOS';

export interface ChecklistenItem {
    name: string;
    markiert: boolean;
    optional: boolean;
    erledigt: boolean;
    kommentar?: string;
}

export interface ChecklisteDaten {
    kuerzel?: string;
    name?: string;
    typ: string;
    items: ChecklistenItem[];
}




