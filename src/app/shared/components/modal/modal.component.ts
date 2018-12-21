import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ModalService } from './modal.service';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'chl-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  @Input()
  body: TemplateRef<any>;

  @Input()
  hideOnEscape = true;

    @Input()
  hideOnClickOutside = true;


    constructor(private modalService: ModalService,
      private eventManager: EventManager) { }

  ngOnInit() {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if (this.hideOnEscape) {
        this.close();
      }
    });
  }

  close() {
    this.modalService.close();
  }

  onClickOutsideModal() {
    if (this.hideOnClickOutside) {
      this.close();
    }
  }

  cancelClick(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
