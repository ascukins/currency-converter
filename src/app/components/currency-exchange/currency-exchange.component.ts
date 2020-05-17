import { Component } from '@angular/core';
import { CurrencyRatesService } from 'src/app/services/currency-rates.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent {

  currency1 = 'USD';
  currency2 = 'EUR';
  amount1 = 1.00;
  amount2 = 1.00;
  mostRecentAmountChanged = 1;

  constructor(
    public currencyRatesService: CurrencyRatesService
  ) {
    this.onAmount1Changed();
  }

  onAmount1Changed() {
    this.mostRecentAmountChanged = 1;
    this.amount2 = this.currencyRatesService.exchange(this.amount1, this.currency1, this.currency2);
  }

  onAmount2Changed() {
    this.mostRecentAmountChanged = 2;
    this.amount1 = this.currencyRatesService.exchange(this.amount2, this.currency2, this.currency1);
  }

  onCurrencyChanged() {
    if (this.mostRecentAmountChanged === 1) {
      this.amount2 = this.currencyRatesService.exchange(this.amount1, this.currency1, this.currency2);
    } else {
      this.amount1 = this.currencyRatesService.exchange(this.amount2, this.currency2, this.currency1);
    }
  }
}
