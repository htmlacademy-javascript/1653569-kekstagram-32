const NAMES = [
  'Мария',
  'Алиса',
  'Иван',
  'Александр',
  'Дарья',
  'Екатерина',
  'Максим',
  'Артём',
  'Владимир',
  'Юлия',
  'Никита',
  'Алексей',
  'Ольга',
  'Сергей',
  'Евгений',
  'Анастасия',
  'Игорь',
  'Полина',
  'Михаил',
  'Татьяна',
  'Роман',
  'Валерия',
  'Фёдор',
  'Яна',
  'Вячеслав',
  'Марина',
  'Георгий',
  'Ксения',
  'Вадим',
  'Инна',
];

const DESCRIPTIONS = [
  'Дети играющие на детской площадке.',
  'Момент, когда влюблённая пара целуется на фоне заката.',
  'Группа друзей на пикнике в парке.',
  'Семья отдыхающая на пляже.',
  'Кошка сидит на подоконнике и смотрит в окно.',
  'Люди стоящих перед зданием с плакатами и флагами.',
  'Мужчина занимается йогой на свежем воздухе.',
  'Дети учатся кататься на велосипедах.',
  'Собака лежащая на ковре в гостиной.',
  'Туристы стоящие перед памятником.',
  'Мужчина готовит ужин на кухне.',
  'Люди собрались на концерте под открытым небом.',
  'Женщина гуляет по парку со своим ребёнком.',
  'Мужчина ловит рыбу на берегу реки.',
  'Студенты сидят в аудитории и слушают лекцию.',
  'Мужчина ремонтирует свой автомобиль в гараже.',
  'Дети играют в футбол на спортивной площадке.',
  'Кошка сидит на окне и смотрит на улицу.',
  'Спортсмен занимается бегом на стадионе.',
  'Дети катаются на роликах по городу.',
  'Собака лежит на диване в гостиной.',
  'Яркие краски осени, которые создают атмосферу уюта и тепла.',
  'Портрет девушки, которая улыбается и смотрит прямо в камеру.',
  'Разноцветные листья лежащие на земле.',
  'Разноцветные звёзды сияющие на ночном небе.',
  'Красивый пейзаж с горами, покрытыми зелёными деревьями.',
  'Закат над озером, окрашенный в тёплые оттенки.',
  'Разноцветные бабочки, порхающие среди цветов.',
  'Портрет молодого человека с задумчивым выражением лица.',
  'Группа студентов, которые обсуждают что-то важное и смеются.',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_USER_POST_COUNT = 25;
const MIN_ID_COUNT = 1;
const MAX_ID_COUNT = SIMILAR_USER_POST_COUNT;
const MAX_AVATAR_COUNT = 6;
const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MIN_COMMENT_COUNT = 0;
const MAX_COMMENT_COUNT = 30;
const MIN_MESSAGE_COUNT = 1;
const MAX_MESSAGE_COUNT = 2;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createNumberGenerator = (min, max, {isUniqueId = false} = {}) => {
  const prevValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (isUniqueId) {
      if (prevValues.length >= (max - min + 1)) {
        return;
      }
      while (prevValues.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      }
      prevValues.push(currentValue);
    }
    return currentValue;
  };
};

const getRandomMessageElement = (messages, count) => {
  const getMessageRandomId = createNumberGenerator(1, messages.length - 1, {isUniqueId: true});
  const similarMessages = Array.from({length: count}, getMessageRandomId);
  return similarMessages.map((item) => messages[item]).join(' ');
};

const getUserPostId = createNumberGenerator(MIN_ID_COUNT, MAX_ID_COUNT, {isUniqueId: true});
const getPhotoId = createNumberGenerator(MIN_ID_COUNT, MAX_ID_COUNT, {isUniqueId: true});
const getLikeCount = createNumberGenerator(MIN_LIKE_COUNT, MAX_LIKE_COUNT);
const getCommentId = createNumberGenerator(MIN_ID_COUNT, MAX_COMMENT_COUNT * MAX_ID_COUNT, {isUniqueId: true});
const getAvatarId = createNumberGenerator(MIN_ID_COUNT, MAX_AVATAR_COUNT);
const getCommentCount = createNumberGenerator(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT);
const getMessageCount = createNumberGenerator(MIN_MESSAGE_COUNT, MAX_MESSAGE_COUNT);

const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getAvatarId()}.svg`,
  message: getRandomMessageElement(COMMENTS, getMessageCount()),
  name: getRandomArrayElement(NAMES),
});

const getComments = () => Array.from({length: getCommentCount()}, createComment);

const createUserPost = () => ({
  id: getUserPostId(),
  url: `photos/${getPhotoId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getLikeCount(),
  comments: getComments(),
});

export const similarUserPosts = Array.from({length: SIMILAR_USER_POST_COUNT}, createUserPost);

