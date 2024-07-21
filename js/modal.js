import { userPosts } from './main.js';
import { isEscapeKey } from './utils.js';
import {
  clearComments,
  setCommentCount,
  renderComments,
  toggleCommentsLoadMoreButton,
  onCommentsLoadMoreButton,
  commentsLoadMoreButton
} from './comment.js';

const modalContainer = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const closeModalButton = modalContainer.querySelector('.big-picture__cancel');
const bigPicture = modalContainer.querySelector('.big-picture__img > img');
const likesCount = modalContainer.querySelector('.likes-count');
const socialCaption = modalContainer.querySelector('.social__caption');

let currentUserPost = null;
let currentUserLink = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const setCurrnetUserPost = (currentPostId) => {
  currentUserPost = userPosts.find((post) => post.id === currentPostId);
};

const updateWindowSize = ({isResize = false} = {}) => {
  const scrollbarWidth = isResize ? window.innerWidth - document.body.clientWidth : 0;
  document.body.style.marginRight = `${scrollbarWidth}px`;
};

const renderSocial = () => {
  const {url, likes, description} = currentUserPost;
  bigPicture.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const changeFocusedElement = ({isModal = false, isLink = false} = {}) => {
  if (isModal) {
    modalContainer.tabIndex = 0;
    modalContainer.focus();
  }

  if (isLink) {
    modalContainer.tabIndex = -1;
    currentUserLink.focus();
  }
};

function openModal() {
  modalContainer.classList.remove('hidden');
  updateWindowSize({isResize: true});
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoadMoreButton.addEventListener('click', onCommentsLoadMoreButton);
  clearComments();
  renderSocial();
  setCommentCount(renderComments);
  changeFocusedElement({isModal: true});
}

function closeModal() {
  modalContainer.classList.add('hidden');
  updateWindowSize();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments({resetCount: true});
  toggleCommentsLoadMoreButton();
  changeFocusedElement({isLink: true});
}

picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    currentUserLink = evt.target.closest('.picture');
    setCurrnetUserPost(parseInt(currentUserLink.dataset.id, 10));
    openModal();
  }
});

closeModalButton.addEventListener('click', () => {
  closeModal();
});

export { currentUserPost, modalContainer };
