import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    // await page.navigateTo();
    // expect(await page.getTitleText()).toEqual('demo app is running!');
    await browser.get('https://cn.bing.com');
    await element(by.id('sb_form_q')).sendKeys('天气');
    await element(by.id('sb_form_go')).click();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
