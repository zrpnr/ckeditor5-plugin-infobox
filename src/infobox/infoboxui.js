import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class InfoBoxUI extends Plugin {
  init() {

    const editor = this.editor;

    editor.ui.componentFactory.add('infoBox', (locale) => {
      const command = editor.commands.get('insertInfoBox');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: editor.t('Info Box'),
        withText: true,
        tooltip: true,
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => editor.execute('insertInfoBox'));

      return buttonView;
    })
  }
}