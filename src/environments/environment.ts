
// It is isecure and generally bad practice to keep API keys in git repo, so please populate your API key before run
const openexchangeratesApiKey = '';

export const environment = {
  production: false,

  currencyListUrl: 'https://openexchangerates.org/api/currencies.json',
  currencyRatesContainerUrl: `https://openexchangerates.org/api/latest.json?app_id=${openexchangeratesApiKey}&base=USD`,

  currencyListBackupUrl: '/assets/currencies/currencies.json',
  currencyRatesContainerBackupUrl: '/assets/currencies/latest.json'
};
