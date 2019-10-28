import _ from 'lodash';
import Collection from '../utils/collection';
import UsersModel from './users';

class Posts {
  collection = new Collection('posts')

  get = () => _.orderBy(this.collection.find({}), ['createdAt'], ['desc'])

  add = (body) => {
    if (UsersModel.isLoggedIn()) {
      const { id, profile: { firstName, lastName, avatar } } = UsersModel.me();
      this.collection.insert({
        body, firstName, lastName, avatar, creatorId: id,
      });
    } else {
      throw new Error('you need to sign in or create an account that to add posts');
    }
  }

  remove = (post) => {
    if (UsersModel.isLoggedIn()) {
      const { id: userId } = UsersModel.me();
      const findedPost = this.collection.findOne(post);
      if (userId === findedPost.creatorId) this.collection.remove(post);
      else throw new Error('you can not remove this post');
    }
  }
}

export default new Posts();
