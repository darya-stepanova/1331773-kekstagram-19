'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var filterDefault = filter.querySelector('#filter-default');
  var filterRandom = filter.querySelector('#filter-random');
  var filterDiscussed = filter.querySelector('#filter-discussed');
  var picruresData;
  window.showFilter = function () {
    filter.classList.remove('img-filters--inactive');
  };
  var filterChooseHandler = function (filterName) {
    filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterName.classList.add('img-filters__button--active');

  };
  filterDefault.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get();
    filterChooseHandler(filterDefault);
    window.gallery.remove();
    window.gallery.renderElements(picruresData, window.gallery.pictures);
  });

  filterRandom.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get().slice();
    filterChooseHandler(filterRandom);
    var dataRandom = picruresData.sort(function () {
      return 0.5 - Math.random();
    });
    window.debounce(function () {
      window.gallery.remove();
      window.gallery.renderElements(dataRandom, window.gallery.pictures);
    });
  });

  filterDiscussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    picruresData = window.data.get().slice();
    filterChooseHandler(filterDiscussed);
    window.gallery.remove();
    var dataDiscussed = picruresData.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.gallery.renderElements(dataDiscussed, window.gallery.pictures);
  });
})();
