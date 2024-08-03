import './image.js';
import { setUserPosts } from './modal.js';
import { debounce, showAlert } from './utils.js';
import { setUserFromSubmit, showSuccess } from './form.js';
import { setFilterThumbnails, initFilter, renderFilteredThumbnails } from './filter.js';
import { renderThumbnails } from './thumbnail.js';
import { getData } from './api.js';

getData()
  .then((posts) => {
    setFilterThumbnails(posts, debounce(renderFilteredThumbnails));
    setUserPosts(posts);
    initFilter();
    renderThumbnails(posts);
  })
  .catch(() => {
    showAlert();
  });

setUserFromSubmit(showSuccess);
