/* eslint-disable @typescript-eslint/no-restricted-imports */
import '@shoelace-style/shoelace/dist/components/card/card.js';

import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import * as examples from '../data/index.js';

const initFunctions = Object.values(examples);

@customElement('start-panel')
export class StartPanel extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 1rem;
      gap: 1rem;
    }

    .card {
      width: 300px;
      font-family: var(--sl-input-font-family);
      font-size: 14px;
      cursor: pointer;
    }
    .card::part(base) {
      background-color: #4158d0;
      background-image: linear-gradient(
        43deg,
        #4158d0 0%,
        #c850c0 46%,
        #ffcc70 100%
      );
    }
    .card::part(body) {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    .card [slot='header'] {
      display: flex;
      align-items: center;
      /* color: red; */
      justify-content: space-between;
    }
  `;

  render() {
    return html`
      <div class="container">
        ${repeat(
          initFunctions,
          fn => html`
            <sl-card
              class="card"
              @click=${() => {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set('init', fn.id);
                window.location.search = urlParams.toString();
              }}
            >
              <div slot="header">${fn.displayName}</div>
              ${fn.description}
            </sl-card>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'start-panel': StartPanel;
  }
}
