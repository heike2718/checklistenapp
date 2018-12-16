import { Component, OnInit, Input } from '@angular/core';
import { ChecklisteDaten, EINKAUFSLISTE, PACKLISTE, TODOS } from '../../shared/model/checkliste';

@Component({
  selector: 'chl-checkliste',
  templateUrl: './checkliste.component.html',
  styleUrls: ['./checkliste.component.css']
})
export class ChecklisteComponent implements OnInit {

  @Input()
  checkliste: ChecklisteDaten;

  @Input()
  typ: string;

  ngOnInit(): void { }


  get classes() {

    const cssClasses = {};

    if (this.typ) {
       switch (this.typ) {
        case EINKAUFSLISTE:
          cssClasses['card-einkaufsliste'] = true;
          break;
        case PACKLISTE:
          cssClasses['card-packliste'] = true;
          break;
        case TODOS:
          cssClasses['card-todos'] = true;
          break;
      }
    }
    return cssClasses;
  }

}
