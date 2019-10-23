import _ from 'lodash';
/**
 * class Collection
 * @param {string} name - name of collection
 *
 * Collection is serialized and saved to localStorage. localStorage key is __collection_${name}__
 */
class Collection {

  items = []

  constructor(name) {
    this.name = name;
    this._loadFromStorage();
  }
 
  /**
   * inserts document to collection.
   * it should generate a unique id prop if it is not presented in the doc.
   * it should generate a createdAt field that equals to new Date().getTime()
   * @param {object} doc - document to insert into collection
   * @return {object} - returns document from collection with newly generated id
   */
  insert(doc) {
    if(!('id' in doc))
      doc.id = _.uniqueId(this.name + '_');
    doc.createdAt = new Date().getTime();
    this.items.push(doc);
    this._saveToStorage();
    return doc;
  }

  /**
   * removes all documents that match selector.
   * if there is no selector, or selector is an empty object, then we clear the collection
   * @param {object} selector
   * @return {number} - number of removed documents
   */
  remove(selector) {
    let prevSize = this.items.length;
    this.items = _.difference(this.items, _.filter(this.items, selector));
    if(_.isEmpty(selector)) 
      this.items = [];
    this._saveToStorage();
    return prevSize - this.items.length;
  }

  /**
   * finds all documents that match selector.
   * if there is no selector, or selector is an empty object, then we return all documents
   * @param {object} selector
   * @return {object}
   */
  find(selector) {
    return _.filter(this.items, selector) || this.items;
  }

  _loadFromStorage() {
    this.items = JSON.parse(localStorage.getItem('__collection_' + this.name + '__')) || [];
  }

  _saveToStorage() {
    localStorage.setItem('__collection_'+ this.name +'__', JSON.stringify(this.items));
  }
}

export default Collection;