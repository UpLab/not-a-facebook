import MiniReact from './modules/MiniReact';
import Feed from './components/Feed';
import PostForm from './components/PostForm';
import posts from './__mocks__/posts';

const App = () => {
  return (
    <div className="app">
      <PostForm />
      <Feed posts={posts} />
    </div>
  );
}

export default App;
