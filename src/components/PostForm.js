import MiniReact from '../modules/MiniReact';

function submit(e) {
  e.preventDefault();
  const post = {
    title: this.title.value,
    body: this.body.value,
  };
  alert(JSON.stringify(post));
}

const PostForm = () => {
  return (
    <form onSubmit={submit}>
      <input type="text" name="title" />
      <textarea name="body"></textarea>
      <input type="submit" />
    </form>
  );
}

export default PostForm;
