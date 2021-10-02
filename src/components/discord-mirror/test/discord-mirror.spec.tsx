import { newSpecPage } from '@stencil/core/testing';
import { DiscordMirror } from '../discord-mirror';

xdescribe('discord-mirror', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DiscordMirror],
      html: `<discord-mirror></discord-mirror>`,
    });
    expect(page.root).toEqualHtml(`
      <discord-mirror>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </discord-mirror>
    `);
  });
});
