import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(food: any[], arg: string): unknown {
    let filtered = []
    for (let i = 0; i < food.length; i++) {
      if (food[i].category === arg) {
        filtered.push(food[i])
      }
    }
    return filtered
  }

}
