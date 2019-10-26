import _ from 'lodash';
<<<<<<< HEAD
=======
import { addID, addCreateAt } from './creators'; 
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
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
<<<<<<< HEAD
  insert(_doc) {
    const doc = { ..._doc };
    if (!('id' in doc)) { doc.id = _.uniqueId(`${this.name}_`); }
    doc.createdAt = new Date().getTime();
    this.items.push(doc);
    this._saveToStorage();
    return doc;
=======
  insert(doc) {
    // TODO: implement
    addID( doc );
    addCreateAt(doc);
    this.items = [doc, ...this.items];
    this._saveToStorage();
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
  }

  /**
   * removes all documents that match selector.
   * if there is no selector, or selector is an empty object, then we clear the collection
   * @param {object} selector
   * @return {number} - number of removed documents
   */
  remove(selector) {
<<<<<<< HEAD
    const prevSize = this.items.length;
    this.items = _.difference(this.items, _.filter(this.items, selector));
    if (_.isEmpty(selector)) { this.items = []; }
    this._saveToStorage();
    return prevSize - this.items.length;
=======
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
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
  }

  /**
   * finds all documents that match selector.
   * if there is no selector, or selector is an empty object, then we return all documents
   * @param {object} selector
   * @return {object}
   */
  find(selector) {
<<<<<<< HEAD
    return _.filter(this.items, selector);
  }

  /**
   * finds one document that match selector.
   * if there is no selector, or selector is an empty object, then we return first doc
   * if there is no documents found, then we return undefined
   * @param {object} selector
   * @return {object or undefined}
   */
  findOne(selector) {
    return _.find(this.items, selector);
  }

  /**
   * updates one document that matches selector.
   * @param {object} selector
   * @param {object} modifier - object with subfields to be merged
   * @param {boolean} deep - if true, then the nested objects are merged recursively
   * @return {object or undefined}
   */
  updateOne(selector, modifier, deep) {
    if (_.isEmpty(selector)) return undefined;
    const doc = this.findOne(selector);
    if (deep) _.merge(doc, modifier);
    else _.assign(doc, modifier);

    return doc;
  }

  _loadFromStorage() {
    this.items = JSON.parse(localStorage.getItem(`__collection_${this.name}__`)) || [];
  }

  _saveToStorage() {
=======
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
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
    localStorage.setItem(`__collection_${this.name}__`, JSON.stringify(this.items));
  }
}

export default Collection;
