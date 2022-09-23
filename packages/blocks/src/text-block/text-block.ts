import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Store } from '@building-blocks/store';
import { TextBlockModel, BLOCK_ID_ATTR } from '../';
import { PageContainer } from '../types';
import { getChildBlocks } from '../__internal__/utils';
import '../__internal__/rich-text/rich-text';

@customElement('text-block-element')
export class TextBlockElement extends LitElement {
  @property()
  store!: Store;

  @property({
    hasChanged() {
      return true;
    },
  })
  model!: TextBlockModel;

  @property()
  page!: PageContainer;

  @state()
  isSelected = false;

  // disable shadow DOM to workaround quill
  createRenderRoot() {
    return this;
  }

  protected firstUpdated(): void {
    this.page.selection.onBlockSelectChange(this.model.id, isSelected => {
      this.isSelected = isSelected;
    });
  }

  public disconnectedCallback(): void {
    this.page.selection.offBlockSelectChange(this.model.id);
  }

  render() {
    this.setAttribute(BLOCK_ID_ATTR, this.model.id);

    const childBlocks = getChildBlocks(this.model, this.page);

    return html`
      <div
        style=${styleMap({
          'background-color': this.isSelected
            ? 'rgba(152, 172, 189, 0.1)'
            : 'transparent',
          margin: '5px 0',
        })}
        class="affine-text-block-container"
      >
        <rich-text .store=${this.store} .model=${this.model}></rich-text>
        <div style="margin-left: 10px">${childBlocks}</div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'text-block-element': TextBlockElement;
  }
}