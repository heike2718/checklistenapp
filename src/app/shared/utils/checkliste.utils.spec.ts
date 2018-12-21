import { MODUS_EXEC, ChecklistenItem, MODUS_CONFIG, Filterkriterium, LISTE_AUSGEWAEHLT, LISTE_VORSCHLAEGE } from '../model/checkliste';
import { loadCheckliste } from '../../services/mockDb';
import { filterChecklisteItems } from './checkliste.utils';

describe('ChecklisteUtils', () => {


    it('should get erledigte items correctly', () => {
        // Arrange
        const checkliste$ = loadCheckliste('1', MODUS_EXEC);
        const kriterium: Filterkriterium = {
            modus: MODUS_EXEC,
            semantik: LISTE_AUSGEWAEHLT
        };

        // Act
        checkliste$.subscribe(
            checkliste => {
                const erledigte: ChecklistenItem[] = filterChecklisteItems(checkliste.items, kriterium);
                // Assert
                expect(erledigte.length).toEqual(2);
            }
        );
    });


    it('should get offene items correctly', () => {
        // Arrange
        const checkliste$ = loadCheckliste('1', MODUS_EXEC);
        const kriterium: Filterkriterium = {
            modus: MODUS_EXEC,
            semantik: LISTE_VORSCHLAEGE
        };

        checkliste$.subscribe(
            checkliste => {
                const offeneItems: ChecklistenItem[] = filterChecklisteItems(checkliste.items, kriterium);
                // Assert
                expect(offeneItems.length).toEqual(4);
            }
        );
    });

    it('should get vorgeschlagene items correctly', () => {
        // Arrange
        const checkliste$ = loadCheckliste('1', MODUS_CONFIG);
        const kriterium: Filterkriterium = {
            modus: MODUS_CONFIG,
            semantik: LISTE_VORSCHLAEGE
        };

        // Act
        checkliste$.subscribe(
            checkliste => {
                const erledigte: ChecklistenItem[] = filterChecklisteItems(checkliste.items, kriterium);
                // Assert
                expect(erledigte.length).toEqual(3);
            }
        );
    });

    it('should get vorgemerkte items correctly', () => {
        // Arrange
        const checkliste$ = loadCheckliste('1', MODUS_CONFIG);
        const kriterium: Filterkriterium = {
            modus: MODUS_CONFIG,
            semantik: LISTE_AUSGEWAEHLT
        };

        // Act
        checkliste$.subscribe(
            checkliste => {
                const vorgemerkte: ChecklistenItem[] = filterChecklisteItems(checkliste.items, kriterium);
                // Assert
                expect(vorgemerkte.length).toEqual(6);
            }
        );
    });
});
