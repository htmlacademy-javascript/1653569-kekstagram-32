import {createUserPosts} from './data.js';

const pictureList = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureListFragment = document.createDocumentFragment();
const userPosts = createUserPosts();

userPosts.forEach(({url, description, comments, likes}) => {
  const postElement = pictureElementTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__img').alt = description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.append(postElement);
});

pictureList.append(pictureListFragment);
