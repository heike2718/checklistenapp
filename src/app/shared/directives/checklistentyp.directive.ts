import { Directive, Input, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { getBackgroundColorByChecklistentyp } from '../utils/checkliste.utils';

@Directive({
	selector: '[chlBackgroundColor]'
})
export class ChecklistentypBackgroundDirective implements AfterViewInit {

	@Input()
	typ: string;

	constructor(private el: ElementRef, private renderer: Renderer) { }

	ngAfterViewInit(): void {
		const color = getBackgroundColorByChecklistentyp(this.typ);
		this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
	}
}
