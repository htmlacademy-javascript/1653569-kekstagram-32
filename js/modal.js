import { ClassName, isEscapeKey, resetScroll, updateWindowSize } from './utils.js';
import { clearComments, setCommentCount, renderComments, toggleCommentsLoadMoreButton,
  onCommentsLoadMoreButton, commentsLoadMoreButton} from './comment.js';

const modalContainer = document.querySelector('.big-picture');
const picturesList = document.querySelector('.pictures');
const cancelModalButton = modalContainer.querySelector('.big-picture__cancel');
const bigPicture = modalContainer.querySelector('.big-picture__img > img');
const likesCount = modalContainer.querySelector('.likes-count');
const socialCaption = modalContainer.querySelector('.social__caption');

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

const getCurrentUserPost = () => currentUserPost;

const renderDetails = () => {
  const {url, likes, description} = currentUserPost;
  bigPicture.src = url;
  bigPicture.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const changeFocusedElement = ({isModal = false, isLink = false} = {}) => {
  if (isModal === isLink) {
    return;
  }
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
  updateWindowSize({isResize: true});
  modalContainer.classList.remove(ClassName.HIDDEN);
  document.body.classList.add(ClassName.MODAL);
  document.addEventListener('keydown', onDocumentKeydown);
  commentsLoadMoreButton.addEventListener('click', onCommentsLoadMoreButton);
  clearComments();
  renderDetails();
  setCommentCount(renderComments);
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
  changeFocusedElement({isLink: true});
}

picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    currentUserLink = evt.target.closest('.picture');
    setCurrnetUserPost(parseInt(currentUserLink.dataset.id, 10));
    openModal();
  }
});

cancelModalButton.addEventListener('click', () => {
  closeModal();
});

export { getCurrentUserPost, setUserPosts, modalContainer };
