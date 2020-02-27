'use strict';
(function () {
  var picturePreviewContainer = document.querySelector('.big-picture');
  var bigPicturePreview = picturePreviewContainer.querySelector('.big-picture__img');
  var srcPicturePreview = bigPicturePreview.querySelector('img');
  var likes = picturePreviewContainer.querySelector('.likes-count');
  var amountComments = picturePreviewContainer.querySelector('.comments-count');
  var comments = picturePreviewContainer.querySelector('.social__comments');
  var countComments = picturePreviewContainer.querySelector('.social__comment-count');
  var loaderComments = picturePreviewContainer.querySelector('.comments-loader');
  var pictureDescription = picturePreviewContainer.querySelector('.social__caption');
  var WIDTH_COMMENTS_IMG = 35;
  var HEIGHT_COMMENTS_IMG = 35;
  var closeButton = picturePreviewContainer.querySelector('.big-picture__cancel');
  comments.innerHTML = '';
  var openPopupImg = function (index, picturesData) {
    openPopupPicture();
    countComments.classList.add('hidden');
    loaderComments.classList.add('hidden');
    srcPicturePreview.src = picturesData[index].url;
    likes.textContent = picturesData[index].likes;
    amountComments.textContent = picturesData[index].comments.length;
    pictureDescription.textContent = picturesData[index].description;
    for (var i = 0; i < picturesData[index].comments.length; i++) {
      var itemComment = picturesData[index].comments[i];
      var comment = document.createElement('li');
      comment.classList.add('social__comment');
      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      var commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = itemComment.avatar;
      commentImg.alt = itemComment.name;
      commentText.textContent = itemComment.message;
      comments.appendChild(comment);
      comment.appendChild(commentImg);
      comment.appendChild(commentText);
      commentImg.width = WIDTH_COMMENTS_IMG;
      commentImg.height = HEIGHT_COMMENTS_IMG;
    }
  };
  var createPopupImg = function (evt, picturesData) {
    if (evt.target.classList.contains('picture__img')) {
      var indexId = evt.target.getAttribute('data-id');
      openPopupImg(indexId, picturesData);
    }
  };
  var keydownCreatePopupImg = function (evt, picturesData) {
    if (evt.key === 'Enter') {
      var indexSrc = evt.srcElement.children[0].dataset.id;
      openPopupImg(indexSrc, picturesData);
    }
  };
  var keydownShowPopupImg = function (evt) {
    keydownCreatePopupImg(evt, window.data.get());
  };
  var showPopupImg = function (evt) {
    createPopupImg(evt, window.data.get());
  };
  window.gallery.pictures.addEventListener('keydown', keydownShowPopupImg);
  window.gallery.pictures.addEventListener('click', showPopupImg);
  var openPopupPicture = function () {
    picturePreviewContainer.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', popupPictureEscPressHandler);
  };
  var closePopupPicture = function () {
    picturePreviewContainer.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    comments.innerHTML = '';
  };
  var popupPictureEscPressHandler = function (evt) {
    if (evt.key === window.ESC_KEY) {
      closePopupPicture();
    }
  };
  closeButton.addEventListener('click', closePopupPicture);
  window.preview = {
    showPopupImg: showPopupImg,
    createPopupImg: createPopupImg,
    openPopupImg: openPopupImg,
    keydownShowPopupImg: keydownShowPopupImg,
    keydownCreatePopupImg: keydownCreatePopupImg
  };
})();
