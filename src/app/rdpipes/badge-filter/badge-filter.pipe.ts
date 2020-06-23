import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeFilterPipe'
})
export class BadgeFilterPipe implements PipeTransform {

  transform(badges: any[], arg: string): any {
    const filtered = [];
    if (arg === 'owned') {
      for (let i = 0; i < badges.length; i++) {
        if (badges[i].phase !== null) {
          filtered.push(badges[i]);
        }
      }
      return filtered;
    } else {
      for (let i = 0; i < badges.length; i++) {
        if (badges[i].phase === null) {
          filtered.push(badges[i]);
        }
      }
      return filtered;
    }
  }
}
