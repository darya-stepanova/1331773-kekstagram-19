'use strict';
(function () {
  var uploadFile = document.getElementById('upload-file');
  var popupBody = document.querySelector('.img-upload__overlay');
  var closeButtonPopupBody = popupBody.querySelector('.img-upload__cancel');
  var formUpload = document.querySelector('.img-upload__form');
  var hashtags = formUpload.querySelector('.text__hashtags');
  window.ESC_KEY = 'Escape';
  var effectPin = formUpload.querySelector('.effect-level__pin');
  var effectValue = formUpload.querySelector('.effect-level__value');
  var imgUploadWrapper = formUpload.querySelector('.img-upload__preview');
  var imgUpload = imgUploadWrapper.querySelector('img');
  var effectLevelLine = formUpload.querySelector('.effect-level__line');
  var effectPinDepth = formUpload.querySelector('.effect-level__depth');
  var effectLevel = formUpload.querySelector('.effect-level');
  effectLevel.style.display = 'none';
  var commentsTextarea = formUpload.querySelector('.text__description');
  var popupBodyEscPressHandler = function (evt) {
    if ((hashtags !== document.activeElement && commentsTextarea !== document.activeElement) && evt.key === window.ESC_KEY) {
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
  var changeEffect = function (effectName) {
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
  changeEffect('none');
  changeEffect('marvin');
  changeEffect('chrome');
  changeEffect('sepia');
  changeEffect('phobos');
  changeEffect('heat');
  var getValueFilter = function (effectFilterValue) {
    var effectList = document.querySelectorAll('.effects__item');
    for (var a = 0; a < effectList.length; a++) {
      var effectInput = effectList[a].querySelector('.effects__radio');
      if (effectInput.checked) {
        var inputChekedValue = effectInput.value;
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
      x: evt.clientX
    };
    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var coordinatesPin = (effectPin.offsetLeft - shift.x);
      var widthEffectLevel = effectLevelLine.offsetWidth;
      var effectFilterValue = coordinatesPin / widthEffectLevel;
      effectValue.value = Math.round(effectFilterValue * 100);
      getValueFilter(effectFilterValue);
      if (coordinatesPin > 0 && coordinatesPin <= widthEffectLevel) {
        effectPinDepth.style.width = coordinatesPin + 'px';
        effectPin.style.left = coordinatesPin + 'px';
      }
    };
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });


  hashtags.addEventListener('change', function () {
    var valueHashtags = hashtags.value;
    var arrHashtags = valueHashtags.split(' ');
    var pattern = /^[A-Za-zА-Яа-яЁё0-9_]+$/;
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
})();
