import { renderComments, clearComments, toggleCommentsLoadMoreButton, onCommentsLoadMoreButton} from './comment.js';
import { ClassName, isEscapeKey, resetScroll, updateWindowSize } from './utils.js';

const modalContainer = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const cancelButton = modalContainer.querySelector('.big-picture__cancel');
const bigPicture = modalContainer.querySelector('.big-picture__img > img');
const likesCount = modalContainer.querySelector('.likes-count');
const socialCaption = modalContainer.querySelector('.social__caption');
const commentsLoadMoreButton = modalContainer.querySelector('.social__comments-loader');

let userPosts = [];
let currentUserPost = null;
let currentUserLink = null;

const setUserPosts = (data) => {
  userPosts = data;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const setCurrnetUserPost = (currentPostId) => {
  currentUserPost = userPosts.find((post) => post.id === currentPostId);
};

const renderDetails = () => {
  const {url, likes, description} = currentUserPost;
  bigPicture.src = url;
  bigPicture.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const changeFocusedElement = ({isModal = false} = {}) => {
  if (isModal) {
    modalContainer.tabIndex = 0;
    modalContainer.focus();
  } else {
    modalContainer.tabIndex = -1;
    currentUserLink.focus();
  }
};

function openModal() {
  updateWindowSize({isResize: true});
  modalContainer.classList.remove(ClassName.HIDDEN);
  document.body.classList.add(ClassName.MODAL);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoadMoreButton.addEventListener('click', onCommentsLoadMoreButton);
  clearComments();
  renderDetails();
  renderComments(currentUserPost.comments);
  changeFocusedElement({isModal: true});
  resetScroll(modalContainer);
}

function closeModal() {
  updateWindowSize();
  modalContainer.classList.add(ClassName.HIDDEN);
  document.body.classList.remove(ClassName.MODAL);
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments({resetCount: true});
  toggleCommentsLoadMoreButton();
  changeFocusedElement();
}

picturesList.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    currentUserLink = thumbnail;
    setCurrnetUserPost(parseInt(currentUserLink.dataset.id, 10));
    openModal();
  }
});

cancelButton.addEventListener('click', () => {
  closeModal();
});

export { setUserPosts };
