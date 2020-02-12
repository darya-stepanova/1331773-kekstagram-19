'use strict';
(function () {
  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var renderElements = function (pictureItemTemplate) {
    var fragment = document.createDocumentFragment();
    var createPropertiesTemplate = function (data) {
      var pictureItem = pictureTemplateElement.cloneNode(true);
      pictureItem.querySelector('.picture__img').src = data.url;
      pictureItem.querySelector('.picture__img').alt = data.description;
      pictureItem.querySelector('.picture__comments').textContent = data.comments.length;
      pictureItem.querySelector('.picture__likes').textContent = data.likes;
      return pictureItem;
    };
    for (var j = 0; j < window.data.photoDescription.length; j++) {
      createPropertiesTemplate(window.data.photoDescription[j]);
      var newElementPicture = createPropertiesTemplate(window.data.photoDescription[j]);
      fragment.appendChild(newElementPicture);
    }
    pictureItemTemplate.appendChild(fragment);
  };
  var pictures = document.querySelector('.pictures');
  renderElements(pictures);
})();
