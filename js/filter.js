import { renderThumbnails } from './thumbnail.js';
import { getRandomSortList } from './utils.js';

const MIN_THUMBNAIL_COUNT = 0;
const MAX_THUMBNAIL_COUNT = 10;

const filter = document.querySelector('.img-filters');
const filterContainer = filter.querySelector('.img-filters__form');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filter.DEFAULT;
let currentPosts = null;

const renderRandomTumbnails = (posts) => {
  const sortedTumbnails = getRandomSortList(posts.slice())
    .slice(MIN_THUMBNAIL_COUNT, MAX_THUMBNAIL_COUNT);
  renderThumbnails(sortedTumbnails);
};

const renderDiscussedThumbnails = (posts) => {
  const sortDiscussed = (postA, postB) => postB.comments.length - postA.comments.length;
  const sortedThumbnails = posts.slice().sort(sortDiscussed);
  renderThumbnails(sortedThumbnails);
};

const renderFilteredThumbnails = () => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return renderRandomTumbnails(currentPosts);
    case Filter.DISCUSSED:
      return renderDiscussedThumbnails(currentPosts);
    default:
      return renderThumbnails(currentPosts);
  }
};

const setFilterThumbnails = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const currentButton = evt.target;
    if (currentFilter !== currentButton.id) {
      filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      currentButton.classList.add('img-filters__button--active');
      currentFilter = currentButton.id;
      callback();
    }
  });
};

const initFilter = (posts) => {
  filter.classList.remove('img-filters--inactive');
  currentPosts = posts.slice();
};

export { initFilter, setFilterThumbnails, renderFilteredThumbnails };
