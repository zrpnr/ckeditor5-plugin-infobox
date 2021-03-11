import { Command } from 'ckeditor5/src/core';

export default class InsertInfoBoxCommand extends Command {
  execute(listItem) {
    const { model } = this.editor;
    model.change((writer) => {
      model.insertContent(createInfoBox(writer, listItem));
    })
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'infoBox',
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createInfoBox(writer, options) {
  const infoBox = writer.createElement('infoBox');
  console.log(`creating ${options.label}`);
  const infoBoxDesc = writer.createElement('infoBoxDesc', { class: `info-box--${options.modifier}`, custom: 'foo' });
  console.log(infoBoxDesc.getAttributes());
  writer.append(infoBoxDesc, infoBox);

  return infoBox;
}