'use strict';
(function () {
  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var renderElements = function (images, pictureItemСontainer) {
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
    pictureItemСontainer.appendChild(fragment);
  };
  var successHandler = function (images) {
    renderElements(images, pictures);
    window.showFilter();
    window.data.save(images);
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
  var removePicruresItem = function () {
    var picruresItem = pictures.querySelectorAll('.picture');
    picruresItem.forEach(function (currentItem) {
      currentItem.remove();
    });
  };
  window.gallery = {
    pictures: pictures,
    remove: removePicruresItem,
    errorHandler: errorHandler,
    renderElements: renderElements
  };
})();
