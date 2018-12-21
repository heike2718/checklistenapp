import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[chlModalOpenOnClick]'
})
export class ModalOpenOnClickDirective {

  // templateRef is a handle to the template i.e <ng-template></ng-template>
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    // viewContainer.createEmbeddedView(templateRef);
  }

  /*
   * Syntax: typescript-Setter mit gleichem Namen wie der selector
   * sorgt dafür, dass in der syntax [chlModalOpenOnClick]="domElementRef"
   * die referenz auf ein DOM-element in die Direktive gepflanscht wird.
   */
  @Input()
  set chlModalOpenOnClick(el: HTMLBaseElement) {
    el.addEventListener('click', () => {

      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);

    });
  }

}
