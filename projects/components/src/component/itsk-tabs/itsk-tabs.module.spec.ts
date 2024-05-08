import { ItskTabsModule } from './itsk-tabs.module';

describe('ItskTabsModule', () => {
  let itskTabsModule: ItskTabsModule;

  beforeEach(() => {
    itskTabsModule = new ItskTabsModule();
  });

  it('should create an instance', () => {
    expect(itskTabsModule).toBeTruthy();
  });
});
