import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: string[], filter: string): string[] {
    if (!filter) {
      return value;
    }
    if (filter.length === 0) {
      return [];
    }

    return value.filter((c: string) => c.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  }
}