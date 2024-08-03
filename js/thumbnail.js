const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (userPosts) => {
  picturesList.querySelectorAll('.picture').forEach((picture) => picture.remove());
  const picturesListFragment = document.createDocumentFragment();

  userPosts.forEach(({id, url, description, comments, likes}) => {
    const post = pictureTemplate.cloneNode(true);
    post.dataset.id = id;
    post.querySelector('.picture__img').src = url;
    post.querySelector('.picture__img').alt = description;
    post.querySelector('.picture__comments').textContent = comments.length;
    post.querySelector('.picture__likes').textContent = likes;
    picturesListFragment.append(post);
  });

  picturesList.append(picturesListFragment);
};

export { renderThumbnails, picturesList };
