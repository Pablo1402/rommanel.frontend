import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPrices',
  standalone: true,
})
export class SortPricesPipe implements PipeTransform {
  transform(prices: any[]): any[] {
    return prices.sort((a, b) => a.price - b.price);
  }
}
