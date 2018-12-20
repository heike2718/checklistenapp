import { Pipe, PipeTransform } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten, MODUS_CONFIG, MODUS_EXEC, LISTE_VORSCHLAEGE, LISTE_AUSGEWAEHLT } from '../model/checkliste';

@Pipe({
  name: 'filterChecklisteItems'
})
export class FilterChecklisteItemsPipe implements PipeTransform {

  transform(items: ChecklistenItem[], args?: any): ChecklistenItem[] {

    if (!args) {
      return items;
    }

    const modus: string = args['modus'];
    const semantik: string = args['semantik'];

    if (!modus || !semantik) {
      return items;
    }

    switch (modus) {
      case MODUS_CONFIG:
        return this.getListeConfig(items, semantik);
      case MODUS_EXEC:
        return this.getListeExecute(items, semantik);
    }

    return items;
  }

  private getListeConfig(items: ChecklistenItem[], semantik: string): ChecklistenItem[] {

    switch (semantik) {
      case LISTE_VORSCHLAEGE:
        break;
      case LISTE_AUSGEWAEHLT:
        break;
    }

    return [];
  }

  private getListeExecute(items: ChecklistenItem[], semantik: string): ChecklistenItem[] {
    return [];
  }
}
