import { Pipe, PipeTransform } from '@angular/core';
import { ChecklisteDaten, MODUS_CONFIG, MODUS_EXEC, Filterkriterium, LISTE_AUSGEWAEHLT } from '../model/checkliste';
import { filterChecklisteItems } from '../utils/checkliste.utils';

@Pipe({
  name: 'statistikCheckliste'
})
export class StatistikChecklistePipe implements PipeTransform {

  transform(checkliste: ChecklisteDaten, args?: any): string {

    const modus = checkliste.modus;

    switch (modus) {
      case MODUS_EXEC:
        return this.getStatistikExecution(checkliste);
      case MODUS_CONFIG:
        return this.getStatistikConfiguration(checkliste);
      default: break;
    }

    return '### OMG: kein modus vorhanden ###';
  }

  private getStatistikConfiguration(checkliste: ChecklisteDaten): string {
    const kriterium: Filterkriterium = {
      modus: checkliste.modus,
      semantik: LISTE_AUSGEWAEHLT
    };
    const items = filterChecklisteItems(checkliste.items, kriterium);
    const anzahlAusgewaehlt = items.length;
    return 'vorgemerkte Dinge: ' + anzahlAusgewaehlt;
  }

  private getStatistikExecution(checkliste: ChecklisteDaten): string {
    const anzahlGesamt = checkliste.items.length;
    let anzahlErledigt = 0;
    checkliste.items.forEach(
      item => { if (item.erledigt) { anzahlErledigt++; } }
    );

    return anzahlErledigt + ' von ' + anzahlGesamt + ' abgehakt';
  }
}
