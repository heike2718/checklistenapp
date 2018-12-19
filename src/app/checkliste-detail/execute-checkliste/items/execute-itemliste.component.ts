import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-execute-itemliste',
  templateUrl: './execute-itemliste.component.html',
  styleUrls: ['./execute-itemliste.component.css']
})
export class ExecuteItemlisteComponent implements OnInit {

  @Input()
  items: ChecklistenItem[];

  @Input()
  typ: string;

  constructor() { }

  ngOnInit() {
  }

}
