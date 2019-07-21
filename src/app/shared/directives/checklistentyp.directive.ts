import { Directive, Input, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { getBackgroundColorByChecklistentyp } from '../utils/checkliste.utils';

@Directive({
	selector: '[chlBackgroundColor]'
})
export class ChecklistentypBackgroundDirective implements AfterViewInit {

	@Input()
	typ: string;

	constructor(private el: ElementRef, private renderer: Renderer2) { }

	ngAfterViewInit(): void {
		const color = getBackgroundColorByChecklistentyp(this.typ);
		this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
	}
}
