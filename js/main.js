import './image.js';
import { setUserPosts } from './modal.js';
import { debounce, showAlert } from './utils.js';
import { setUserFromSubmit, closeForm } from './form.js';
import { setFilterThumbnails, initFilter, renderFilteredThumbnails } from './filter.js';
import { getData } from './api.js';

getData()
  .then((posts) => {
    setFilterThumbnails(debounce(renderFilteredThumbnails));
    setUserPosts(posts);
    initFilter(posts);
    renderFilteredThumbnails(posts);
  })
  .catch(() => {
    showAlert();
  });

setUserFromSubmit(closeForm);
