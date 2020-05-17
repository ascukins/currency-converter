# Currency Converter

Minimalistic currency converter. 

Source of currency rates: https://docs.openexchangerates.org/

Rates are updated hourly.

Angular source code features:

- Component interaction using banana-in-a-box 
- RxJS http.get error handling
- APP_INITIALIZER with Promise

### Local setup

Set `openexchangeratesApiKey` variable in `environments.ts` file, otherwise APP will use local copy of rates.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

### Live demo

https://ascukins.github.io/currency-converter/
