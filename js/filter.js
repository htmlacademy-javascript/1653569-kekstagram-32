import { renderThumbnails } from './thumbnail.js';

const THUMBNAILS_COUNT = 10;

const filter = document.querySelector('.img-filters');
const filterContainer = filter.querySelector('.img-filters__form');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filter.DEFAULT;

const renderRandomTumbnails = (posts) => {
  const sortRandom = (list) => {
    let m = list.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = list[m];
      list[m] = list[i];
      list[i] = t;
    }
    return list;
  };
  const sortedTumbnails = sortRandom(posts.slice()).slice(0, THUMBNAILS_COUNT);
  return renderThumbnails(sortedTumbnails);
};

const renderDiscussedThumbnails = (posts) => {
  const sortDiscussed = (a, b) => b.comments.length - a.comments.length;
  const sortedThumbnails = posts.slice().sort(sortDiscussed);
  return renderThumbnails(sortedThumbnails);
};

const renderFilteredThumbnails = (posts) => {
  switch(currentFilter) {
    case Filter.RANDOM:
      return renderRandomTumbnails(posts);
    case Filter.DISCUSSED:
      return renderDiscussedThumbnails(posts);
    default:
      return renderThumbnails(posts);
  }
};

const setFilterThumbnails = (posts, callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const currentButton = evt.target;
    if (currentFilter !== currentButton.id) {
      filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      currentButton.classList.add('img-filters__button--active');
      currentFilter = currentButton.id;
      callback(posts);
    }
  });
};

const initFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

export { initFilter, setFilterThumbnails, renderFilteredThumbnails };
