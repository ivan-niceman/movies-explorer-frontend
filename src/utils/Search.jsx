import { DURATION_SHORT } from './constants';

export default class Search {
  constructor(itemsList) {
    this._itemsList = itemsList;
  }

  _isShort(status, items) {
    return status ? items.filter(item => item.duration <= DURATION_SHORT) : items
  }

  search(text, statusCheckbox) {
    const searchText = text.toLowerCase()
    return this._isShort(statusCheckbox, this._itemsList).filter(item =>
      item.nameRU.toLowerCase().includes(searchText) || item.nameEN.toLowerCase().includes(searchText)
    );
  };
}
