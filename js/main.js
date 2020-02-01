'use strict';
var photoDescription = [];
var textsForComment = ['Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
var NamesForComment = ['Денис', 'Виктория', 'Алина', 'Кузьма', 'Альбина', 'Макар', 'Павел', 'Адольф', 'Христофор', 'Василий', 'Аксинья', 'Арсен', 'Зарина', 'Всеволод'];
var random = function random(min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var picture = document.getElementById('picture');
var fragment = document.createDocumentFragment();
var propertyCreation = function (quantity) {
  for (var i = 1; i <= quantity; i++) {
    var photoDescriptionItem = {
      url: 'photos/' + i + '.jpg',
      description: ' ',
      likes: random(15, 200),
      comments: {
        avatar: 'img/avatar-' + random(1, 6) + '.svg',
        massage: textsForComment[i % 2],
        name: NamesForComment[random(1, NamesForComment.length)]
      }
    };
    photoDescription.push(photoDescriptionItem);
    var pictureItem = document.createElement('a');
    pictureItem.classList.add('picture');
    fragment.appendChild(pictureItem);
  }
  picture.appendChild(fragment);
};
propertyCreation(25);
var pictureSelector = document.querySelectorAll('.picture');
for (var j = 0; j < pictureSelector.length; j++) {
  var child = '.picture' + ':nth-child(' + (j + 1) + ')';
  var pictureSelectorItem = document.querySelector(child);
  var pictureImg = document.createElement('img');
  pictureSelectorItem.appendChild(pictureImg);
  pictureImg.classList.add('picture__img');
  pictureImg.src = photoDescription[j].url;
  var pictureInfo = document.createElement('p');
  pictureSelectorItem.appendChild(pictureInfo);
  pictureInfo.classList.add('picture__info');
  var pictureComments = document.createElement('span');
  pictureInfo.appendChild(pictureComments);
  pictureComments.classList.add('picture__comments');
  pictureComments.textContent = textsForComment.length - 1;
  var pictureLikes = document.createElement('span');
  pictureInfo.appendChild(pictureLikes);
  pictureLikes.classList.add('picture__likes');
  pictureLikes.textContent = photoDescription[j].likes;
}

