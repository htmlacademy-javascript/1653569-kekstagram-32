import { isEscapeKey } from './utils';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const imageForm = document.querySelector('.img-upload__form');
const imageInput = imageForm.querySelector('.img-upload__input');
const windowOverlay = imageForm.querySelector('.img-upload__overlay');
const buttonCancel = imageForm.querySelector('.img-upload__cancel');
const hashtagInput = imageForm.querySelector('.text__hashtags');
const descriptionInput = imageForm.querySelector('.text__description');

const pristine = new Pristine(imageForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const getHashtags = (value) => value.trim().split(' ');

const validateHashtag = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashtags(value);
  return hashtags.every((hashtag) => hashtag.match(/^#[a-zа-яё0-9]{1,19}$/i));
};

const checkHashtagCount = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const checkHashtagRepeat = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.length === [...new Set(hashtags)].length;
};

const validateDescription = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInput, validateHashtag, 'Введён невалидный хэштег');
pristine.addValidator(hashtagInput, checkHashtagCount, 'Превышено количество хэштегов');
pristine.addValidator(hashtagInput, checkHashtagRepeat, 'Хэштеги повторяются');
pristine.addValidator(descriptionInput, validateDescription, 'Длина комментария больше 140 символов');

imageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (document.activeElement === hashtagInput || document.activeElement === descriptionInput) {
    evt.stopPropagation();
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  windowOverlay.classList.remove('hidden');
  document.body.classList.add('modal-form');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeForm() {
  windowOverlay.classList.add('hidden');
  document.body.classList.remove('modal-form');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagInput.value = null;
  imageInput.value = null;
  descriptionInput.value = null;
  pristine.validate();
}

imageInput.addEventListener('change', () => {
  openForm();
});

buttonCancel.addEventListener('click', () => {
  closeForm();
});
