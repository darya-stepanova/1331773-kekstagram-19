'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  var xhr = '';
  var loadData = function (onSuccess, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var loadHandler = function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
    var errorHandler = function () {
      onError('Произошла ошибка соединения');
    };
    var timeoutHandler = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };
    xhr.addEventListener('load', loadHandler);
    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', timeoutHandler);
    xhr.timeout = TIMEOUT;
  };
  var load = function (onSuccess, onError) {
    loadData(onSuccess, onError);
    xhr.open('GET', URL);
    xhr.send();
  };
  var upload = function (data, onSuccess, onError) {
    loadData(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };
  window.network = {
    load: load,
    upload: upload
  };
})();

