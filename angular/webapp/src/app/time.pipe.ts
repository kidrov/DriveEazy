import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: Date): string {
    if (value instanceof Date) {
      return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '';
  }
}
