import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(arr, keys: string, enteredText: string) {
    if (!enteredText) return arr;
    return (arr || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(enteredText, 'gdi').test(item[key])));
  }

}
