import { currentUserPost } from './modal.js';
import { modalContainer } from './modal.js';

const COMMENT_COUNT = 5;

const socialContainer = document.querySelector('.big-picture__social');
const commentsList = socialContainer.querySelector('.social__comments');
const commentShownCount = socialContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = socialContainer.querySelector('.social__comment-total-count');
const commentsLoadMoreButton = socialContainer.querySelector('.social__comments-loader');

let commentCount = COMMENT_COUNT;

const clearComments = ({resetCount = false} = {}) => {
  if (resetCount) {
    commentCount = COMMENT_COUNT;
  }
  commentsList.innerHTML = '';
};

const toggleCommentsLoadMoreButton = ({isHidden = false} = {}) => {
  commentsLoadMoreButton.classList.toggle('hidden', isHidden);
};

const scrollCommentsList = () => {
  modalContainer.scrollTo({top: commentsList.scrollHeight, behavior: 'smooth'});
};

const setCommentCount = (countComments) => {
  const {comments} = currentUserPost;
  const currentComments = countComments();
  commentShownCount.textContent = currentComments.length;
  commentTotalCount.textContent = comments.length;

  if (currentComments.length === comments.length) {
    toggleCommentsLoadMoreButton({isHidden: true});
  }

  commentCount += COMMENT_COUNT;
};

const renderComments = () => {
  const {comments} = currentUserPost;
  const currentComments = comments.slice(0, commentCount);
  const commentFragment = document.createDocumentFragment();

  currentComments.forEach(({avatar, message, name}) => {
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
  return currentComments;
};

const onCommentsLoadMoreButton = () => {
  clearComments();
  setCommentCount(renderComments);
  scrollCommentsList();
};

export {
  clearComments,
  scrollCommentsList,
  setCommentCount,
  renderComments,
  toggleCommentsLoadMoreButton,
  onCommentsLoadMoreButton,
  commentsLoadMoreButton,

};
