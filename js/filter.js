'use strict';
(function () {
  var filter = document.querySelector('.img-filters');
  var filterDefault = filter.querySelector('#filter-default');
  var filterRandom = filter.querySelector('#filter-random');
  var filterDiscussed = filter.querySelector('#filter-discussed');
  var picturesData;
  var showFilter = function () {
    filter.classList.remove('img-filters--inactive');
  };
  var showPopupImg = function (evt) {
    window.preview.createPopupImg(evt, picturesData);
  };
  var keydownShowPopupImgFilter = function (evt) {
    window.preview.keydownCreatePopupImg(evt, picturesData);
  };
  var filterChooseHandler = function (filterName) {
    filter.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterName.classList.add('img-filters__button--active');
    window.gallery.pictures.removeEventListener('click', window.preview.showPopupImg);
    window.gallery.pictures.removeEventListener('keydown', window.preview.keydownShowPopupImg);
  };
  filterDefault.addEventListener('click', function (evt) {
    evt.preventDefault();
    picturesData = window.data.get();
    filterChooseHandler(filterDefault);
    window.gallery.remove();
    window.gallery.renderElements(picturesData, window.gallery.pictures);
    window.gallery.pictures.addEventListener('click', showPopupImg);
    window.gallery.pictures.addEventListener('keydown', keydownShowPopupImgFilter);
  });

  filterRandom.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterChooseHandler(filterRandom);
    window.debounce(function () {
      picturesData = window.data.get().slice();
      var dataRandom = picturesData.sort(function () {
        return 0.5 - Math.random();
      });
      window.gallery.remove();
      window.gallery.renderElements(dataRandom.slice(0, 10), window.gallery.pictures);
      window.gallery.pictures.addEventListener('click', showPopupImg);
      window.gallery.pictures.addEventListener('keydown', keydownShowPopupImgFilter);
    });
  });

  filterDiscussed.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterChooseHandler(filterDiscussed);
    window.debounce(function () {
      picturesData = window.data.get().slice();
      window.gallery.remove();
      var dataDiscussed = picturesData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.gallery.pictures.addEventListener('click', showPopupImg);
      window.gallery.pictures.addEventListener('keydown', keydownShowPopupImgFilter);
      window.gallery.renderElements(dataDiscussed, window.gallery.pictures);
    });
  });
  window.filter = {
    keydownShowPopupImgFilter: keydownShowPopupImgFilter,
    showFilter: showFilter
  };
})();
