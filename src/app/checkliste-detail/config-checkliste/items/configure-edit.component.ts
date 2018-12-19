import { Component, OnInit, Input } from '@angular/core';
import { ChecklistenItem } from '../../../shared/model/checkliste';

@Component({
  selector: 'chl-configure-edit',
  templateUrl: './configure-edit.component.html',
  styleUrls: ['./configure-edit.component.css']
})
export class ConfigureEditComponent implements OnInit {

  @Input()
  items: ChecklistenItem[];

  @Input()
  typ: string;

  constructor() { }

  ngOnInit() {
  }

}
