import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-currency-amount-select',
  templateUrl: './currency-amount-select.component.html',
  styleUrls: ['./currency-amount-select.component.scss']
})
export class CurrencyAmountSelectComponent implements OnInit {

  @Input() currencies;
  @Input() currency: string;
  @Input() amount: number;
  @Output() currencyChange = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();


  constructor() { }

  ngOnInit(): void {
  }

  onAmountChange(amount) {
    this.amountChange.emit(amount);
  }
  onCurrencyChange(currency) {
    this.currencyChange.emit(currency);
  }

}
