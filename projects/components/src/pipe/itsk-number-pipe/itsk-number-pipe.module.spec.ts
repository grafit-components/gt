import { ItskNumberPipeModule } from './itsk-number-pipe.module';

describe('ItskNumberPipeModule', () => {
  let itskNumberPipeModule: ItskNumberPipeModule;

  beforeEach(() => {
    itskNumberPipeModule = new ItskNumberPipeModule();
  });

  it('should create an instance', () => {
    expect(itskNumberPipeModule).toBeTruthy();
  });
});
