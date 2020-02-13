'use strict';
(function () {
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
    var onMouseMove = function (moveEvt) {
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
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.form = {
    hashtags: hashtags
  };
})();
