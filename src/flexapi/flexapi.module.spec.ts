import { FlexapiModule } from './flexapi.module';

describe('FlexapiModule', () => {
  let flexapiModule: FlexapiModule;

  beforeEach(() => {
    flexapiModule = new FlexapiModule();
  });

  it('should create an instance', () => {
    expect(flexapiModule).toBeTruthy();
  });
});
