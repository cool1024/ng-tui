import { newE2EPage } from '@stencil/core/testing';

describe('cool-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cool-button></cool-button>');

    const element = await page.find('cool-button');
    expect(element).toHaveClass('hydrated');
  });
});
