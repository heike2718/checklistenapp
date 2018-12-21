import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'chl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  @Input()
  body: TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
