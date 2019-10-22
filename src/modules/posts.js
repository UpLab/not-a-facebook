import _ from 'lodash';
import Collection from '../utils/collection';

class Posts {
  collection = new Collection('posts')

  get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  add = ({ body }) => this.collection.insert({ body })
}

export default new Posts();
