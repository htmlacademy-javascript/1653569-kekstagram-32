const isValidString = (string, length) => string.length <= length;

isValidString('bottom', 5);
isValidString('top', 3);


const isPalindromeString = (string) => {
  const normalizedString = string.trim().replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');
  return normalizedString === reversedString;
};

isPalindromeString(' Лёша нА  пОлке Кло па наШёл   ');
isPalindromeString('КомОк ');
isPalindromeString('Топор');


const getInteger = (data) => {
  const string = typeof data === 'number' ? data.toString() : data;
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!(Number.isNaN(parseInt(string[i], 10)))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

getInteger('ECMAscript 2022');
getInteger('ECMAscript ');
getInteger(100500);
getInteger(-10);
getInteger(2.25);
