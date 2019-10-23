import faker from 'faker';
import _ from 'lodash';
import db from './db';

/**
 * class Collection
 * @param {string} name - name of collection
 *
 * Collection is serialized and saved to localStorage. localStorage key is __collection_${name}__
 */
class Collection {
  name = null

  constructor(name) {
    this.name = `__collection_${name}__`;
    db.defaults({ [this.name]: [] }).write();
  }

  /**
   * inserts document to collection.
   * it should generate a unique id prop if it is not presented in the doc.
   * it should generate a createdAt field that equals to new Date().getTime()
   * @param {object} doc - document to insert into collection
   * @return {object} - returns document from collection with newly generated id
   */
  insert(doc) {
    if (!doc.hasOwnProperty('id')) {
      doc.id = faker.random.uuid();
    }
    doc.createdAt = new Date().getTime();
    this.getCollection().push(doc).write();
    return doc;
  }

  /**
   * removes all documents that match selector.
   * if there is no selector, or selector is an empty object, then we clear the collection
   * @param {object} selector
   * @return {number} - number of removed documents
   */
  remove(selector) {
    const prevSize = this.getCollectionSize();
    if (_.isEmpty(selector)) {
      db.set(this.name, []).write();
    }
    this.getCollection().remove(selector).write();
    return prevSize - this.getCollectionSize();
  }

  /**
   * finds all documents that match selector.
   * if there is no selector, or selector is an empty object, then we return all documents
   * @param {object} selector
   * @return {object} - returns document from collection with newly generated id
   */
  find(selector) {
    if (_.isEmpty(selector)) {
      return this.getCollection().filter(selector).value();
    }
  }

  getCollection = () => db.get(this.name)

  getCollectionSize = () => this.getCollection().filter({}).value().length;
}

export default Collection;
