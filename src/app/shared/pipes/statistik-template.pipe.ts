import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'statistikTemplate'
})
export class StatistikTemplatePipe implements PipeTransform {

	transform(items: string[], ...args: any[]): any {

		return 'Anzahl Dinge: ' + items.length;
	}

}
