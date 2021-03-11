import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, Model, createDropdown, addListToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class InfoBoxUI extends Plugin {
  init() {

    const editor = this.editor;
    const boxGroup = this.editor.config.get('infoBox');

    editor.ui.componentFactory.add('infoBox', (locale) => {
      const command = editor.commands.get('insertInfoBox');
      const dropdownView = createDropdown(locale);
      let dropdownPanelContent;

      dropdownView.buttonView.set({
        label: editor.t('Info Box'),
        withText: true,
        tooltip: true,
      });

      dropdownView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      dropdownView.on('execute', (evt, data) => {
        console.log({ evt, data });
        editor.execute('insertInfoBox', evt.source._item);
        editor.editing.view.focus();
      });

      addListToDropdown(dropdownView, this._getListDefinitions(boxGroup));

      return dropdownView;
    });
  }

  _getListDefinitions(listItems) {
    const editor = this.editor;
    const command = editor.commands.get('insertInfoBox');
    const itemDefinitions = new Collection();

    for (const listItem of listItems) {
      const definition = {
        type: 'button',
        model: new Model({
          _item: listItem,
          label: listItem.label,
          withText: true,
        })
      }

      definition.model.bind('isOn').to(command, 'value', value => {
        return value === definition.model.label;
      });

      itemDefinitions.add(definition);
    }

    return itemDefinitions;
  }

}