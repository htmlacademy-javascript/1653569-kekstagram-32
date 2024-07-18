import { userPosts } from './main.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (posts) => {
  const picturesListFragment = document.createDocumentFragment();

  posts.forEach(({id, url, description, comments, likes}) => {
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

const initThumbnails = () => {
  renderThumbnails(userPosts);
};

export { initThumbnails };
