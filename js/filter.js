'use strict';
(function () {
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var picruresData;
  var lastTimeout;
  var removePicruresItem = function () {
    var picruresItem = window.pictures.pictures.querySelectorAll('.picture');
    picruresItem.forEach(function (currentItem) {
      currentItem.remove();
    });
  };
  var chooseFilterHandler = function (filterName) {
    window.loading.filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterName.classList.add('img-filters__button--active');

  };
  filterDefault.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get();
    chooseFilterHandler(filterDefault);
    removePicruresItem();
    window.renderElements(picruresData, window.pictures.pictures);
  });

  filterRandom.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get().slice();
    chooseFilterHandler(filterRandom);
    var dataRandom = picruresData.sort(function () {
      return 0.5 - Math.random();
    });
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      removePicruresItem();
      window.renderElements(dataRandom, window.pictures.pictures);
    }, 500);
  });

  filterDiscussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get().slice();
    chooseFilterHandler(filterDiscussed);
    removePicruresItem();
    var dataDiscussed = picruresData.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    window.renderElements(dataDiscussed, window.pictures.pictures);
  });
})();
