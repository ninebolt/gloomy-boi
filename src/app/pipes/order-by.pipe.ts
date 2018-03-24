import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], args: any) {
    if (!value || !args) {
      return value;
    }
    if (!Object.keys(value[0]).includes(args)) {
      return value;
    }

    value.sort((a: any, b: any) => {
      if (a[args] > b[args]) {
        return 1;
      } else if (a[args] < b[args]) {
        return -1;
      } else {
        return 0;
      }
    });

    return value;
  }
}