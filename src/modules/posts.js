import _ from 'lodash';
import Collection from '../utils/collection';

class Posts {
  collection = new Collection('posts')

  get = () => {
    console.log(this.collection.find({}))
    return _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])}

  add = ({ body }) => this.collection.insert({ body })
  remove = (selector) => this.collection.remove(selector)
}

export default new Posts();
