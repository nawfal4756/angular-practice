import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any) {
    if (!Array.isArray(array)) {
      return
    }
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
    return array
  }

}
