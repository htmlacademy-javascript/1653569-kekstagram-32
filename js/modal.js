import { userPosts } from './main.js';
import { isEscapeKey, isEnterKey } from './utils.js';

const COMMENT_COUNT = 5;

const picturesList = document.querySelector('.pictures');
const modalContainer = document.querySelector('.big-picture');
const closeModalButton = modalContainer.querySelector('.big-picture__cancel');
const bigPictureUrl = modalContainer.querySelector('.big-picture__img > img');
const likesCount = modalContainer.querySelector('.likes-count');
const socialCaption = modalContainer.querySelector('.social__caption');
const commentsList = modalContainer.querySelector('.social__comments');
const commentShownCount = modalContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = modalContainer.querySelector('.social__comment-total-count');
const commentsLoaderButton = modalContainer.querySelector('.social__comments-loader');

let commentCount = COMMENT_COUNT;
let currentUserPost;

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    openModal(evt.target.dataset.id);
  }
};

const clearComments = ({resetCount = false} = {}) => {
  if (resetCount) {
    commentCount = COMMENT_COUNT;
  }
  commentsList.innerHTML = '';
};

const controlLoaderButton = ({hidden = false} = {}) => {
  switch (hidden) {
    case true:
      commentsLoaderButton.classList.add('hidden');
      break;
    case false:
      commentsLoaderButton.classList.remove('hidden');
      break;
  }
};

const getUserPost = (postId) => {
  currentUserPost = userPosts.find((post) => post.id === parseInt(postId, 10));
};

const renderComments = () => {
  const {comments} = currentUserPost;
  const currentComments = comments.slice(0, commentCount);
  const commentListFragment = document.createDocumentFragment();

  currentComments.forEach(({avatar, message, name}) => {
    const commentLiElement = document.createElement('li');
    commentLiElement.classList.add('social__comment');

    const commentImgElement = document.createElement('img');
    commentImgElement.classList.add('social__picture');
    commentImgElement.src = avatar;
    commentImgElement.alt = name;
    commentImgElement.width = 35;
    commentImgElement.height = 35;

    const commentPElement = document.createElement('p');
    commentPElement.classList.add('social__text');
    commentPElement.textContent = message;

    commentLiElement.append(commentImgElement, commentPElement);
    commentListFragment.append(commentLiElement);
  });

  commentsList.append(commentListFragment);

  commentShownCount.textContent = currentComments.length;
  commentTotalCount.textContent = comments.length;

  if (currentComments.length === comments.length) {
    controlLoaderButton({hidden: true});
  }
  commentCount += COMMENT_COUNT;
};

const renderSocial = () => {
  const {url, likes, description} = currentUserPost;
  bigPictureUrl.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const onLoaderButton = () => {
  clearComments();
  renderComments();
};

function openModal(postId) {
  modalContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.style.marginRight = `${26}px`;
  document.addEventListener('keydown', onEscapeKeydown);
  commentsLoaderButton.addEventListener('click', onLoaderButton);
  getUserPost(postId);
  clearComments();
  renderSocial();
  renderComments();
}

function closeModal() {
  modalContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.style.marginRight = 0;
  document.removeEventListener('keydown', onEscapeKeydown);
  commentsLoaderButton.removeEventListener('click', onLoaderButton);
  clearComments({resetCount: true});
  controlLoaderButton();
}

picturesList.addEventListener('click', (evt) => {
  if (evt.target.parentElement.className === 'picture') {
    openModal(evt.target.parentElement.dataset.id);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.target.className === 'picture') {
    onEnterKeydown(evt);
  }
});

closeModalButton.addEventListener('click', () => {
  closeModal();
});
