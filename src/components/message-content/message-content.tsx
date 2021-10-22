import { FunctionalComponent, h } from '@stencil/core';
import { parseCode } from '../../utils/utils';
import { Message } from '../models';

export const MessageContent: FunctionalComponent<{ message: Message }> = ({ message }) => {
  return message.gif ? (
    <div class="chat-gif" style={{ marginTop: '3px', marginBottom: '3px' }}>
      <picture>
        <source srcSet={message.gif.gifUrl} media="(prefers-reduced-motion: no-preference)" style={{ width: '300px', height: 'auto' }}></source>
        <img srcSet={message.gif.preview} alt={message.gif.alt} style={{ width: '300px', height: 'auto' }} part="image" />
      </picture>
      {/* We need to display a `via tenor` message per terms of the Tenor API */}
      {message.gif.gifUrl.match('tenor') && (
        <p style={{ fontSize: '10px', margin: '0', marginTop: '-20px', paddingLeft: '5px', mixBlendMode: 'difference', color: 'white' }} aria-hidden="true">
          Via Tenor
        </p>
      )}
    </div>
  ) : (
    <div class="message-text" part="message-text" innerHTML={parseCode(message.text)}></div>
  );
};
