import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[chlModalOpenOnClick]'
})
export class ModalOpenOnClickDirective implements OnInit {

  // templateRef is a handle to the template i.e <ng-template></ng-template>
  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.close$.subscribe(
      () => this.viewContainer.clear()
    );
  }

  /*
   * Syntax: typescript-Setter mit gleichem Namen wie der selector
   * sorgt dafür, dass in der syntax [chlModalOpenOnClick]="[domElementRef1,domElementRef2]"
   * die referenz auf ein DOM-element-Array in die Direktive gepflanscht wird.
   */
  @Input()
  set chlModalOpenOnClick(els) {

    let elements: HTMLBaseElement[];

    // ein oder mehrere elemente durchreichen
    if (els.length) {
      elements = els;
    } else {
      elements = [els];
    }

    elements.forEach(el => {
      el.addEventListener('click', () => {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
    });
  }
}
