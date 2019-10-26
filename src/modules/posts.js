import _ from 'lodash';
import Collection from '../utils/collection';

class Posts {
  collection = new Collection('posts')

  get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

<<<<<<< HEAD
  add = ({ body }) => this.collection.insert({ body })

  remove = (post) => this.collection.remove(post);
=======
  add = (post) => this.collection.insert( post )

  remove = ( post ) => this.collection.remove(post)
>>>>>>> 9384d0e6ce6d7b3f88b8ea97fa900087e6ded89d
}

export default new Posts();
