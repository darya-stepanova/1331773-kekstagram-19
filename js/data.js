'use strict';
(function () {
  var photoDescription = [];
  var textsForComment = [
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NamesForComment = ['Денис', 'Виктория', 'Алина', 'Кузьма', 'Альбина', 'Макар', 'Павел', 'Адольф', 'Христофор', 'Василий', 'Аксинья', 'Арсен', 'Зарина', 'Всеволод'];
  var getRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };
  var createComments = function () {
    var comments = [];
    for (var k = 0; k < getRandomNumber(1, textsForComment.length); k++) {
      comments[k] = {
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
        massage: textsForComment[getRandomNumber(0, textsForComment.length)],
        name: NamesForComment[getRandomNumber(1, NamesForComment.length)]
      };
    }
    return comments;
  };
  var getProperty = function (quantity) {
    for (var i = 1; i <= quantity; i++) {
      var photoDescriptionItem = {
        url: 'photos/' + i + '.jpg',
        description: ' ',
        likes: getRandomNumber(15, 200),
        comments: createComments()
      };
      photoDescription.push(photoDescriptionItem);
    }
  };
  getProperty(25);
  window.data = {
    photoDescription: photoDescription
  };
})();
