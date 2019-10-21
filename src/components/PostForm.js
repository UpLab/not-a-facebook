import React from 'react';

function submit(e) {
  e.preventDefault();
  const post = {
    title: e.target.title.value,
    body: e.target.body.value,
  };
  alert(JSON.stringify(post));
}

const PostForm = () => (
  <form onSubmit={submit}>
    <input type="text" name="title" />
    <textarea name="body" />
    <input type="submit" />
  </form>
);

export default PostForm;
