import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.model';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(characters: Character[], filter: string): Character[] {
    if (!filter) {
      return [];
    }
    if (filter.length === 0) {
      return [];
    }

    return characters.filter((c: Character) => c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);
  }
}