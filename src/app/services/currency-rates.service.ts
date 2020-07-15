import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RateContainer } from '../models/rate-container';
import { Currencies } from '../models/currencies';

@Injectable({
  providedIn: 'root'
})
export class CurrencyRatesService {

  public rateLoadStatusMessage = '';
  public currencies: Currencies;
  public rateContainer: RateContainer;
  public rateDate: Date = new Date();

  constructor(
    private http: HttpClient
  ) { }

  isEmpty(obj: any) {
    if (!obj) {
      return true;
    }
    // tslint:disable-next-line:forin
    for (const x in obj) {
      return false;
    }
    return true;
  }

  currenciesExist() {
    return !this.isEmpty(this.currencies);
  }

  initializeRates() {
    return forkJoin(
      {
        currencies: this.http.get(environment.currencyListUrl),
        rateContainer: this.http.get(environment.currencyRatesContainerUrl),
      }
    ).pipe(
      tap(() => this.rateLoadStatusMessage = 'Openexchangerates API fetch succeded.'),
      catchError(error => {
        this.rateLoadStatusMessage = 'Openexchangerates API fetch failed. Using local copy. ' +
          'Please check the settings in environment.ts';
        return forkJoin(
          {
            currencies: this.http.get(environment.currencyListBackupUrl),
            rateContainer: this.http.get(environment.currencyRatesContainerBackupUrl),
          });
      }),
      catchError(err => {
        this.rateLoadStatusMessage = 'Could not fetch rates. ' +
          'Please check the settings in environment.ts';
        return of({
          currencies: {},
          rateContainer: { rates: {} }
        });
      }),
      tap(result => {
        this.currencies = result.currencies as Currencies;
        this.rateContainer = result.rateContainer as RateContainer;
        this.rateContainer.rates[this.rateContainer.base] = 1;
        this.cleanUpCurrenciesWithoutRates();
        this.rateDate = new Date(this.rateContainer.timestamp * 1000);
      })
    )
      .toPromise();
  }

  private cleanUpCurrenciesWithoutRates() {
    Object.getOwnPropertyNames(this.currencies).forEach(currencyCode => {
      if (!this.rateContainer.rates[currencyCode]) {
        delete this.currencies[currencyCode];
      }
    });
  }

  exchange(amount: number, currencyFrom: string, currencyTo: string) {
    amount = Number(amount);
    const rateFrom = this.rateContainer.rates[currencyFrom];
    const rateTo = this.rateContainer.rates[currencyTo];
    if (rateFrom && rateTo) {
      return Math.round(amount * (rateTo / rateFrom) * 100) / 100;
    } else {
      return 0;
    }
  }

}
