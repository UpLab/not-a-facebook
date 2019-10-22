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
    // TODO: implement
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
  }

  /**
   * removes all documents that match selector.
   * if there is no selector, or selector is an empty object, then we clear the collection
   * @param {object} selector
   * @return {number} - number of removed documents
   */
  remove(selector) {
    // TODO: implement
  }

  /**
   * finds all documents that match selector.
   * if there is no selector, or selector is an empty object, then we return all documents
   * @param {object} selector
   * @return {object} - returns document from collection with newly generated id
   */
  find(selector) {
    // TODO: implement
  }

  _loadFromStorage() {
    // TODO: implement
  }

  _saveToStorage() {
    // TODO: implement
  }
}

export default Collection;
