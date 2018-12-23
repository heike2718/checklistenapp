import * as _ from 'lodash';
// tslint:disable-next-line:max-line-length
import { EINKAUFSLISTE, PACKLISTE, TODOS, ChecklistenItem, MODUS_CONFIG, MODUS_EXEC, Filterkriterium, LISTE_VORSCHLAEGE, LISTE_AUSGEWAEHLT } from '../model/checkliste';


// === private functions ==/
function getListeConfiguration(items: ChecklistenItem[], semantik: string): ChecklistenItem[] {

  if (!semantik) {
    return [];
  }

  switch (semantik) {
    case LISTE_VORSCHLAEGE:
      return items.filter(it => !it.markiert);
    case LISTE_AUSGEWAEHLT:
      return items.filter(it => it.markiert);
    default: return [];
  }
}

function getListeExecution(items: ChecklistenItem[], semantik: string): ChecklistenItem[] {
  if (!semantik) {
    return [];
  }
  switch (semantik) {
    case LISTE_VORSCHLAEGE:
      return items.filter(it => it.markiert && !it.erledigt);
    case LISTE_AUSGEWAEHLT:
      return items.filter(it => it.markiert && it.erledigt);
    default: return [];
  }
}

// === public functions ==/

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



export function filterChecklisteItems(items: ChecklistenItem[], filterkriterium: Filterkriterium): ChecklistenItem[] {

  switch (filterkriterium.modus) {
    case MODUS_CONFIG:
      return getListeConfiguration(items, filterkriterium.semantik);
    case MODUS_EXEC:
      return getListeExecution(items, filterkriterium.semantik);
    default: return [];
  }
}

export function findItemByName(items: ChecklistenItem[], name: string): ChecklistenItem {
  const item = _.find(items, { name: name });
  if (item) {
    return <ChecklistenItem>item;
  }
  return undefined;
}



