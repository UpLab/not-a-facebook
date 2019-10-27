import _ from 'lodash';
import Collection from '../utils/collection';

class Posts {
  collection = new Collection('posts')

  get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  add = (post) => this.collection.insert(post)

  addUser = (post, user) => this.collection.insertUser(post, user)

  remove = (post) => this.collection.remove(post);
}

export default new Posts();
