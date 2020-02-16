'use strict';
(function () {
  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  window.renderElements = function (images, pictureItemTemplate) {
    var fragment = document.createDocumentFragment();
    var createPropertiesTemplate = function (data) {
      var pictureItem = pictureTemplateElement.cloneNode(true);
      pictureItem.querySelector('.picture__img').src = data.url;
      pictureItem.querySelector('.picture__img').alt = data.description;
      pictureItem.querySelector('.picture__comments').textContent = data.comments.length;
      pictureItem.querySelector('.picture__likes').textContent = data.likes;
      return pictureItem;
    };
    for (var j = 0; j < images.length; j++) {
      createPropertiesTemplate(images[j]);
      var newElementPicture = createPropertiesTemplate(images[j]);
      fragment.appendChild(newElementPicture);
    }
    pictureItemTemplate.appendChild(fragment);
  };
  var successHandler = function (images) {
    window.renderElements(images, pictures);
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #B22222;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.padding = '10px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.load(successHandler, errorHandler);
  window.pictures = {
    pictures: pictures
  };
})();
