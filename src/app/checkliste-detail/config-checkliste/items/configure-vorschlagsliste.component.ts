import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ChecklistenItem, ChecklisteDaten } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-configure-vorschlagsliste',
  templateUrl: './configure-vorschlagsliste.component.html',
  styleUrls: ['./configure-vorschlagsliste.component.css']
})
export class ConfigureVorschlagslisteComponent implements OnInit {

  @Input()
  items: ChecklistenItem[];

  @Input()
  typ: string;

  @Input()
  checkliste: ChecklisteDaten;


  constructor() { }

  ngOnInit() {
  }

}
