import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyValue]',
  standalone: true,
  providers: [CurrencyPipe]
})
export class CurrencyValueDirective implements OnChanges {
  @Input({ required: true }) value: number = 0;
  @Input() currencyCode: string = 'PLN';
  @Input() locale: string = 'fr';

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] || changes['currencyCode'] || changes['locale']) {
      this.formatValue();
    }
  }

  private formatValue() {
    const formattedValue = this.currencyPipe.transform(this.value, this.currencyCode, 'symbol', '2.2-2', this.locale);
    if (formattedValue) {
      this.el.nativeElement.textContent = formattedValue;
    }
  }
}
