'use strict';
(function () {
  var pattern = /^[A-Za-zА-Яа-яЁё0-9_]+$/;
  var checkFirstLetter = function (currenItemHashtags) {
    if (currenItemHashtags[0] !== '#') {
      window.form.hashtags.setCustomValidity('хэш-тег должен начинаться с символа #');
    }
  };
  var checkLengthItem = function (currenItemHashtags) {
    if (currenItemHashtags.length === 1) {
      window.form.hashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
    }
  };
  var checkLengthTotal = function (currenItemHashtags) {
    if (currenItemHashtags.length > 20) {
      window.form.hashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку;');
    }
  };
  var checkSeparation = function (currenItemHashtags) {
    if (currenItemHashtags.substr(1, currenItemHashtags.length - 1).indexOf('#') > -1) {
      window.form.hashtags.setCustomValidity('хэш-теги должны разделяться пробелами');
    }
  };
  var checkSymbol = function (currenItemHashtags) {
    if (!pattern.test(currenItemHashtags.substr(1, currenItemHashtags.length - 1))) {
      window.form.hashtags.setCustomValidity('не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи ');
    }
  };
  var checkRepeat = function (currenItemHashtags, arrHashtags, quantity) {
    for (var j = 0; j < arrHashtags.length; j++) {
      var itemHashtagsLowerCase = currenItemHashtags.toLowerCase();
      if (j !== quantity && itemHashtagsLowerCase === arrHashtags[j]) {
        window.form.hashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
        break;
      }
    }
  };
  var checkQuantity = function (arrHashtags) {
    if (arrHashtags.length > 5) {
      window.form.hashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов;');
    }
  };
  window.form.hashtags.addEventListener('change', function () {
    var valueHashtags = window.form.hashtags.value;
    var arrHashtags = valueHashtags.split(' ');
    window.form.hashtags.setCustomValidity('');
    for (var i = 0; i < arrHashtags.length; i++) {
      var itemHashtags = arrHashtags[i];
      checkFirstLetter(itemHashtags);
      checkSymbol(itemHashtags);
      checkLengthItem(itemHashtags);
      checkSeparation(itemHashtags);
      checkLengthTotal(itemHashtags);
      checkRepeat(itemHashtags, arrHashtags, i);
    }
    checkQuantity(arrHashtags);
  });
})();
