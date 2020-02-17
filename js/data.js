'use strict';
(function () {
  var data;

  var saveData = function (newData) {
    data = newData;
    return data;
  };
  var getData = function () {
    return data;
  };
  window.data = {
    save: saveData,
    get: getData
  };
})();
