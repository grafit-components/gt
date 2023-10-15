import { ItskCurrencyPipeModule } from './itsk-currency-pipe.module';

describe('ItskCurrencyPipeModule', () => {
  let itskCurrencyPipeModule: ItskCurrencyPipeModule;

  beforeEach(() => {
    itskCurrencyPipeModule = new ItskCurrencyPipeModule();
  });

  it('should create an instance', () => {
    expect(itskCurrencyPipeModule).toBeTruthy();
  });
});
