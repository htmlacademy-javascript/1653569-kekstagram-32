import { renderThumbnails } from './thumbnail.js';
import { setUserPosts } from './modal.js';
import { showAlert } from './utils.js';
import { setUserFromSubmit, showSuccess } from './form.js';
import { getData } from './api.js';
import './modal.js';
import './image.js';


getData()
  .then((posts) => {
    renderThumbnails(posts);
    setUserPosts(posts);
  })
  .catch(() => {
    showAlert();
  });

setUserFromSubmit(showSuccess);
