/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
export namespace Components {
  interface DiscordMirror {
    /**
     * If read protection is enabled in your database, the Firebase project's Web API Key
     */
    token: string;
    /**
     * The URL of the Firebase Realtime Database to pull data from
     */
    url: string;
  }
}
declare global {
  interface HTMLDiscordMirrorElement extends Components.DiscordMirror, HTMLStencilElement {}
  var HTMLDiscordMirrorElement: {
    prototype: HTMLDiscordMirrorElement;
    new (): HTMLDiscordMirrorElement;
  };
  interface HTMLElementTagNameMap {
    'discord-mirror': HTMLDiscordMirrorElement;
  }
}
declare namespace LocalJSX {
  interface DiscordMirror {
    /**
     * If read protection is enabled in your database, the Firebase project's Web API Key
     */
    token?: string;
    /**
     * The URL of the Firebase Realtime Database to pull data from
     */
    url?: string;
  }
  interface IntrinsicElements {
    'discord-mirror': DiscordMirror;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'discord-mirror': LocalJSX.DiscordMirror & JSXBase.HTMLAttributes<HTMLDiscordMirrorElement>;
    }
  }
}
