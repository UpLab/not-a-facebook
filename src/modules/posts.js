import _ from 'lodash';
import Collection from '../utils/collection';

class Posts {
  collection = new Collection('posts')

  get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  add = (body) => this.collection.insert({ body })

  remove = (id) => this.collection.remove({ id })
}

export default new Posts();
