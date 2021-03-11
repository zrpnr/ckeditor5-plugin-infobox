import { Plugin } from 'ckeditor5/src/core';
import { toWidget, toWidgetEditable } from 'ckeditor5/src/widget';
import { Widget } from 'ckeditor5/src/widget';
import InsertInfoBoxCommand from './insertinfoboxcommand';

export default class InfoBoxEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      'insertInfoBox',
      new InsertInfoBoxCommand(this.editor),
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register('infoBox', {
      isObject: true,
      allowWhere: '$block',
      allowAttributes: ['label', 'modifier']
    });

    schema.register('infoBoxDesc', {
      isLimit: true,
      allowIn: 'infoBox',
      allowContentOf: '$root',
    });

    schema.addChildCheck((context, childDefinition) => {
      if (context.endsWith('infoBoxDesc') && childDefinition.name == 'infoBox') {
        return false;
      }
    })
  }

  _defineConverters() {
    const { conversion } = this.editor;

    conversion.for('upcast').elementToElement({
      model: 'infoBox',
      view: {
        name: 'section',
        classes: 'info-box',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'infoBox',
      view: (modelElement, { writer: viewWriter }) => (
        viewWriter.createContainerElement('section', {
          class: `info-box info-box--${modelElement.getAttribute('modifier')}`,
        })
      )
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'infoBox',
      view: (modelElement, { writer: viewWriter }) => {
        const label = modelElement.getAttribute('label');
        const section = viewWriter.createContainerElement('section', {
          class: `info-box info-box--${modelElement.getAttribute('modifier')}`,
          'data-label': label
        });

        return toWidget(section, viewWriter, { label });
      }
    });

    conversion.for('upcast').elementToElement({
      model: 'infoBoxDesc',
      view: {
        name: 'div',
        classes: 'info-box-description',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'infoBoxDesc',
      view: {
        name: 'div',
        classes: 'info-box-description',
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'infoBoxDesc',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'info-box-description',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });
  }
}