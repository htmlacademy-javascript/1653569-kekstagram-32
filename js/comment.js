import { ClassName } from './utils.js';

const MIN_COMMENT_COUNT = 0;
const STEP_COMMENT_COUNT = 5;

const modalContainer = document.querySelector('.big-picture');
const socialDetail = document.querySelector('.big-picture__social');
const commentsList = socialDetail.querySelector('.social__comments');
const commentShownCount = socialDetail.querySelector('.social__comment-shown-count');
const commentTotalCount = socialDetail.querySelector('.social__comment-total-count');
const commentsLoadMoreButton = socialDetail.querySelector('.social__comments-loader');

let currentComments = null;
let commentCount = STEP_COMMENT_COUNT;

const clearComments = ({resetCount = false} = {}) => {
  if (resetCount) {
    commentCount = STEP_COMMENT_COUNT;
  }
  commentsList.innerHTML = '';
};

const toggleCommentsLoadMoreButton = ({isHidden = false} = {}) => {
  commentsLoadMoreButton.classList.toggle(ClassName.HIDDEN, isHidden);
};

const setCommentCount = (sliceComments) => {
  commentShownCount.textContent = sliceComments.length;
  commentTotalCount.textContent = currentComments.length;

  if (currentComments.length === sliceComments.length) {
    toggleCommentsLoadMoreButton({isHidden: true});
  }

  commentCount += STEP_COMMENT_COUNT;
};

const renderComments = (postComments) => {
  currentComments = postComments;
  const sliceComments = currentComments.slice(MIN_COMMENT_COUNT, commentCount);
  const commentFragment = document.createDocumentFragment();

  sliceComments.forEach(({avatar, message, name}) => {
    const commentListItem = document.createElement('li');
    commentListItem.classList.add('social__comment');

    const commentUserAvatar = document.createElement('img');
    commentUserAvatar.classList.add('social__picture');
    commentUserAvatar.src = avatar;
    commentUserAvatar.alt = name;
    commentUserAvatar.width = 35;
    commentUserAvatar.height = 35;

    const commentUserMessage = document.createElement('p');
    commentUserMessage.classList.add('social__text');
    commentUserMessage.textContent = message;

    commentListItem.append(commentUserAvatar, commentUserMessage);
    commentFragment.append(commentListItem);
  });

  commentsList.append(commentFragment);
  setCommentCount(sliceComments);
};

const scrollCommentList = () => {
  modalContainer.scrollTo({top: modalContainer.scrollHeight, behavior: 'smooth'});
};

const onCommentsLoadMoreButton = () => {
  clearComments();
  renderComments(currentComments);
  scrollCommentList();
};

export { clearComments, renderComments, toggleCommentsLoadMoreButton, onCommentsLoadMoreButton };
