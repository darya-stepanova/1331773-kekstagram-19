'use strict';
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
var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
var renderElements = function (pictureItemTemplate) {
  var fragment = document.createDocumentFragment();
  var createPropertiesTemplate = function (data) {
    var pictureItem = pictureTemplateElement.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = data.url;
    pictureItem.querySelector('.picture__img').alt = data.description;
    pictureItem.querySelector('.picture__comments').textContent = data.comments.length;
    pictureItem.querySelector('.picture__likes').textContent = data.likes;
    return pictureItem;
  };
  for (var j = 0; j < photoDescription.length; j++) {
    createPropertiesTemplate(photoDescription[j]);
    var newElementPicture = createPropertiesTemplate(photoDescription[j]);
    fragment.appendChild(newElementPicture);
  }
  pictureItemTemplate.appendChild(fragment);
};
var pictures = document.querySelector('.pictures');
renderElements(pictures);

var uploadFile = document.getElementById('upload-file');
var popupBody = document.querySelector('.img-upload__overlay');
var closeButtonPopupBody = popupBody.querySelector('.img-upload__cancel');
var formUpload = document.querySelector('.img-upload__form');
var hashtags = formUpload.querySelector('.text__hashtags');
var ESC_KEY = 'Escape';
var effectPin = formUpload.querySelector('.effect-level__pin');
var effectValue = formUpload.querySelector('.effect-level__value');
var imgUploadWrapper = formUpload.querySelector('.img-upload__preview');
var imgUpload = imgUploadWrapper.querySelector('img');
var effectLevelLine = formUpload.querySelector('.effect-level__line');
var effectPinDepth = formUpload.querySelector('.effect-level__depth');
var effectLevel = formUpload.querySelector('.effect-level');
effectLevel.style.display = 'none';
var popupBodyEscPressHandler = function (evt) {
  if (hashtags !== document.activeElement && evt.key === ESC_KEY) {
    closePopupBody();
  }
};
var openPopupBody = function () {
  popupBody.classList.remove('hidden');
  document.addEventListener('keydown', popupBodyEscPressHandler);
};
var closePopupBody = function () {
  popupBody.classList.add('hidden');
  document.removeEventListener('keydown', popupBodyEscPressHandler);
  uploadFile.value = '';
  imgUpload.className = '';
  effectLevel.style.display = 'none';
  imgUpload.style.filter = '';
};

uploadFile.addEventListener('change', openPopupBody);
closeButtonPopupBody.addEventListener('click', closePopupBody);
var effectChange = function (effectName) {
  var effect = document.querySelector('#effect-' + effectName);
  effect.addEventListener('click', function () {
    if (effectName === 'none') {
      imgUpload.className = '';
      effectLevel.style.display = 'none';
    } else {
      imgUpload.className = ('effects__preview--' + effectName);
      effectLevel.style.display = 'block';
    }
    imgUpload.style.filter = '';
    effectPin.style.left = effectLevelLine.offsetWidth + 'px';
    effectPinDepth.style.width = effectLevelLine.offsetWidth + 'px';
  });
};
effectChange('none');
effectChange('marvin');
effectChange('chrome');
effectChange('sepia');
effectChange('phobos');
effectChange('heat');

// filter value
var getValueFilter = function (effectFilterValue) {
  var effectList = document.querySelectorAll('.effects__item');
  for (var a = 0; a < effectList.length; a++) {
    var effectinput = effectList[a].querySelector('.effects__radio');
    if (effectinput.checked) {
      var inputChekedValue = effectinput.value;
    }
  }
  if (inputChekedValue === 'sepia') {
    var imgFilterValue = 'sepia(' + effectFilterValue + ')';
  }
  if (inputChekedValue === 'chrome') {
    imgFilterValue = 'grayscale(' + effectFilterValue + ')';
  }
  if (inputChekedValue === 'marvin') {
    imgFilterValue = 'invert(' + effectFilterValue * 100 + '%)';
  }
  if (inputChekedValue === 'phobos') {
    imgFilterValue = 'blur(' + effectFilterValue * 3 + 'px)';
  }
  if (inputChekedValue === 'heat') {
    imgFilterValue = 'brightness(' + effectFilterValue * 3 + ')';
  }
  imgUpload.style.filter = imgFilterValue;
  return inputChekedValue;
};
effectPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    var coordinatesPin = (effectPin.offsetLeft - shift.x);
    var widthEffectLevel = effectLevelLine.offsetWidth;
    effectValue.value = coordinatesPin / widthEffectLevel;
    getValueFilter(effectValue.value);
    if (coordinatesPin > 0 && coordinatesPin <= widthEffectLevel) {
      effectPinDepth.style.width = coordinatesPin + 'px';
      effectPin.style.left = coordinatesPin + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


hashtags.addEventListener('change', function () {
  var valueHashtags = hashtags.value;
  var arrHashtags = valueHashtags.split(' ');
  var pattern = /^[a-zA-Z0-9_]+$/;
  hashtags.setCustomValidity('');
  var checkFirstLetter = function (currenItemHashtags) {
    if (currenItemHashtags[0] !== '#') {
      hashtags.setCustomValidity('хэш-тег должен начинаться с символа #');
    }
  };
  var checkLengthItem = function (currenItemHashtags) {
    if (currenItemHashtags.length === 1) {
      hashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    }
  };
  var checkLengthTotal = function (currenItemHashtags) {
    if (currenItemHashtags.length > 20) {
      hashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку;');
    }
  };
  var checkSeparation = function (currenItemHashtags) {
    if (currenItemHashtags.substr(1, currenItemHashtags.length - 1).indexOf('#') > -1) {
      hashtags.setCustomValidity('хэш-теги должны разделяться пробелами');
    }
  };
  var checkSymbol = function (currenItemHashtags) {
    if (!pattern.test(currenItemHashtags.substr(1, currenItemHashtags.length - 1))) {
      hashtags.setCustomValidity('не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи ');
    }
  };
  var checkRepeat = function (currenItemHashtags) {
    for (var j = 0; j < arrHashtags.length; j++) {
      var itemHashtagsLowerCase = currenItemHashtags.toLowerCase();
      if (j !== i && itemHashtagsLowerCase === arrHashtags[j]) {
        hashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
        break;
      }
    }
  };
  var checkQuantity = function () {
    if (arrHashtags.length > 5) {
      hashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов;');
    }
  };
  for (var i = 0; i < arrHashtags.length; i++) {
    var itemHashtags = arrHashtags[i];
    checkFirstLetter(itemHashtags);
    checkSymbol(itemHashtags);
    checkLengthItem(itemHashtags);
    checkSeparation(itemHashtags);
    checkRepeat(itemHashtags);
    checkLengthTotal(itemHashtags);
  }
  checkQuantity();
});
