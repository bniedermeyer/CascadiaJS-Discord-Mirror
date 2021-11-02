import { Component, h } from '@stencil/core';

@Component({
  tag: 'loading-indicator',
  styleUrl: 'loading-indicator.css',
  shadow: true,
})
export class LoadingIndicator {
  render() {
    return (
      <div class="loading-container">
        <span class="loading-text" part="loading-text">
          Connecting to Discord
        </span>
        <div class="loading-spinner" aria-hidden="true" part="loading-spinner"></div>
      </div>
    );
  }
}
