import { newE2EPage } from '@stencil/core/testing';

describe('discord-mirror', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<discord-mirror></discord-mirror>');

    const element = await page.find('discord-mirror');
    expect(element).toHaveClass('hydrated');
  });
});
