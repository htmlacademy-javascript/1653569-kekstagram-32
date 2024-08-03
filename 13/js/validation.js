const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_COMMENT_LENGTH: `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`,
  INVALID_HASHTAG_COUNT: 'Превышено количество хэштегов',
  INVALID_HASHTAG: 'Введён невалидный хэштег',
  NOT_UNIQUE: 'Хэштеги повторяются'
};

const fieldsInput = document.querySelector('.img-upload__text');
const hashtagInput = fieldsInput.querySelector('.text__hashtags');
const descriptionInput = fieldsInput.querySelector('.text__description');

const pristine = new Pristine(fieldsInput, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeHashtags = (hashtags) => hashtags
  .trim()
  .split(' ')
  .filter((hashtag) => Boolean(hashtag.length));

const validateHashtag = (tags) => {
  if (!tags) {
    return true;
  }
  const hashtags = normalizeHashtags(tags);
  return hashtags.every((hashtag) => VALID_SYMBOLS.test(hashtag));
};

const checkHashtagCount = (tags) => {
  const hashtags = normalizeHashtags(tags);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

const checkHashtagRepeat = (tags) => {
  const hashtags = normalizeHashtags(tags).map((tag) => tag.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
};

const validateDescription = (tags) => tags.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInput, validateHashtag, ErrorText.INVALID_HASHTAG, 1, true);
pristine.addValidator(hashtagInput, checkHashtagRepeat, ErrorText.NOT_UNIQUE, 2, true);
pristine.addValidator(hashtagInput, checkHashtagCount, ErrorText.INVALID_HASHTAG_COUNT, 3, true);
pristine.addValidator(descriptionInput, validateDescription, ErrorText.INVALID_COMMENT_LENGTH);

export { pristine, hashtagInput, descriptionInput };
