import InfoBoxEditing from './infoboxediting';
import InfoBoxUI from './infoboxui';
import { Plugin } from 'ckeditor5/src/core';

export default class InfoBox extends Plugin {
  static get requires() {
    return [InfoBoxEditing, InfoBoxUI];
  }
}