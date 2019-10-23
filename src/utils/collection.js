import _ from 'lodash';
import { addID, addCreateAt } from './creators'; 
/**
 * class Collection
 * @param {string} name - name of collection
 *
 * Collection is serialized and saved to localStorage. localStorage key is __collection_${name}__
 */
class Collection {
  name = null

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
    // TODO: implement
    addID( doc );
    addCreateAt(doc);
    this.items = [doc, ...this.items];
    this._saveToStorage();
  }

  /**
   * removes all documents that match selector.
   * if there is no selector, or selector is an empty object, then we clear the collection
   * @param {object} selector
   * @return {number} - number of removed documents
   */
  remove(selector) {
    let countItems;
    if(_.isEmpty(selector) || _.isUndefined(selector))
    {
      countItems = this.items.length;
      this.items = [];
      this._saveToStorage();
      this._saveToStorage();
      return countItems;
    }

    countItems = this.items.length - _.remove(this.items, (item) => {
      if(selector.id)
        return item.id < selector.id;
    }).length;

    this._saveToStorage();

    return countItems;
  }

  /**
   * finds all documents that match selector.
   * if there is no selector, or selector is an empty object, then we return all documents
   * @param {object} selector
   * @return {object} - returns document from collection with newly generated id
   */
  find(selector) {
    // TODO: implement
    if(_.isEmpty(selector) || _.isUndefined(selector))
      return this.items;
    return this.items.filter((item)=>{
      if(item.body)
        return item.body.toLowerCase().includies(selector.body);
    });
    
  }

  _loadFromStorage() {
    // TODO: implement
    let load = localStorage.getItem(`__collection_${this.name}__`);
    let items = load? JSON.parse(load):[];
    if(items)
      this.items = items;
  }

  _saveToStorage() {
    // TODO: implement
    localStorage.setItem(`__collection_${this.name}__`, JSON.stringify(this.items));
  }
}

export default Collection;
