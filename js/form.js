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
  var controlInput = formUpload.querySelector('.scale__control--value');
  var controlSmaller = formUpload.querySelector('.scale__control--smaller');
  var controlBigger = formUpload.querySelector('.scale__control--bigger');
  effectLevel.style.display = 'none';
  var commentsTextarea = formUpload.querySelector('.text__description');
  var imgFilterValue = '';
  var popupBodyEscPressHandler = function (evt) {
    if ((hashtags !== document.activeElement && commentsTextarea !== document.activeElement) && evt.key === window.ESC_KEY) {
      closePopupBody();
    }
  };
  var openPopupBody = function () {
    document.querySelector('body').classList.add('modal-open');
    popupBody.classList.remove('hidden');
    document.addEventListener('keydown', popupBodyEscPressHandler);
    controlInput.value = '100%';
    effectValue.value = '100';
  };
  var closePopupBody = function () {
    document.querySelector('body').classList.remove('modal-open');
    popupBody.classList.add('hidden');
    document.removeEventListener('keydown', popupBodyEscPressHandler);
    uploadFile.value = '';
    imgUpload.className = '';
    effectLevel.style.display = 'none';
    imgUpload.style.filter = '';
    imgUpload.style.transform = '';
    hashtags.value = '';
    commentsTextarea.value = '';
    hashtags.style.border = ' ';
    formUpload.querySelector('#effect-none').checked = 'true';
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
    switch (inputChekedValue) {
      case 'sepia':
        imgFilterValue = 'sepia(' + effectFilterValue + ')';
        break;
      case 'chrome':
        imgFilterValue = 'grayscale(' + effectFilterValue + ')';
        break;
      case 'marvin':
        imgFilterValue = 'invert(' + effectFilterValue * 100 + '%)';
        break;
      case 'phobos':
        imgFilterValue = 'blur(' + effectFilterValue * 3 + 'px)';
        break;
      case 'heat':
        imgFilterValue = 'brightness(' + effectFilterValue * 3 + ')';
        break;
      default:
        imgFilterValue = ' ';
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
      var pinCoordinates = (effectPin.offsetLeft - shift.x);
      var widthEffectLevel = effectLevelLine.offsetWidth;
      var effectFilterValue = pinCoordinates / widthEffectLevel;
      effectValue.value = Math.round(effectFilterValue * 100);
      getValueFilter(effectFilterValue);
      if (pinCoordinates > 0 && pinCoordinates <= widthEffectLevel) {
        effectPinDepth.style.width = pinCoordinates + 'px';
        effectPin.style.left = pinCoordinates + 'px';
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


  hashtags.addEventListener('input', function () {
    if (hashtags.validity.valid) {
      hashtags.removeAttribute('style');
    } else {
      hashtags.style.border = '2px solid red';
    }
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
  commentsTextarea.addEventListener('invalid', function () {
    if (commentsTextarea.validity.tooLong) {
      commentsTextarea.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
    commentsTextarea.style.border = '2px solid red';
  });
  var changeSize = function (valueChange, minValue, maxValue) {
    var controlValue = controlInput.value;
    var replaceControlValue = controlValue.replace(/[^0-9]/g, '');
    if (replaceControlValue >= minValue && replaceControlValue <= maxValue) {
      var controlValueChange = replaceControlValue - valueChange;
      controlInput.value = controlValueChange + '%';
      imgUpload.style.transform = 'scale(' + controlValueChange / 100 + ')';
    }
  };
  var increaseSize = function () {
    changeSize(-25, 0, 99);
  };
  var reduceSize = function () {
    changeSize(25, 26, 100);
  };
  controlSmaller.addEventListener('click', reduceSize);
  controlBigger.addEventListener('click', increaseSize);
  var closePopupMessage = function (nameEvent) {
    var closePopupMessageHandler = function () {
      var nameEventContainer = document.querySelector('.' + nameEvent);
      nameEventContainer.parentNode.removeChild(nameEventContainer);
    };
    document.querySelector('.' + nameEvent).addEventListener('click', closePopupMessageHandler);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        closePopupMessageHandler();
      }
    });
  };
  var openSuccessMessage = function () {
    closePopupBody();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    closePopupMessage('success');
  };
  var openErrorMessage = function () {
    closePopupBody();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    closePopupMessage('error');
  };
  formUpload.addEventListener('submit', function (evt) {
    window.upload(new FormData(formUpload), openSuccessMessage, openErrorMessage);
    evt.preventDefault();
  });
})();
