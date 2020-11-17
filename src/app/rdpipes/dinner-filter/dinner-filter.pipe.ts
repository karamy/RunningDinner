import { Pipe, PipeTransform } from '@angular/core';
import { Dinner } from 'src/app/home/tabs/dinners/dinners.service';

@Pipe({
  name: 'dinnerFilter'
})
export class DinnerFilterPipe implements PipeTransform {

  transform(dinnerList: Dinner[], filter: number) {
    const filtered: Dinner[] = [];
    if (filter !== 0) {
      for (let i = 0; i < dinnerList.length; i++) {
        if (dinnerList[i].type === filter) {
          filtered.push(dinnerList[i]);
        }
      }
      return filtered;
    } else {
      return dinnerList;
    }
  }

}
