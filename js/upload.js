'use strict';
(function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var closePopupMessageHandler = function (nameEvent) {
    var nameEventContainer = document.querySelector('.' + nameEvent);
    nameEventContainer.parentNode.removeChild(nameEventContainer);
  };
  var closePopupMessage = function (nameEvent) {
    document.querySelector('.' + nameEvent).addEventListener('click', function () {
      var eventContainer = document.querySelector('.' + nameEvent);
      eventContainer.parentNode.removeChild(eventContainer);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        closePopupMessageHandler(nameEvent);
      }
    });
  };
  var openSuccessMessage = function () {
    window.form.closePopupBody();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);
    closePopupMessage('success');
  };
  var openErrorMessage = function () {
    window.form.closePopupBody();
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorMessage);
    closePopupMessage('error');
  };
  window.form.formUpload.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.form.formUpload), openSuccessMessage, openErrorMessage);
    evt.preventDefault();
  });
})();
