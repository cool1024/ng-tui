import { newSpecPage } from '@stencil/core/testing';
import { CoolButton } from '../cool-button';

describe('cool-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CoolButton],
      html: `<cool-button></cool-button>`,
    });
    expect(page.root).toEqualHtml(`
      <cool-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cool-button>
    `);
  });
});
