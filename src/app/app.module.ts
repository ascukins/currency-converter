import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyAmountSelectComponent } from './components/currency-amount-select/currency-amount-select.component';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { CurrencyRatesService } from './services/currency-rates.service';


export function initApp(currencyRatesService: CurrencyRatesService) {
  return () => currencyRatesService.initializeRates();
}

@NgModule({
  declarations: [
    AppComponent,
    CurrencyAmountSelectComponent,
    CurrencyExchangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [CurrencyRatesService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
