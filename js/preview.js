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
  comments.innerHTML = '';

  window.showPreviewPicture = function () {
    var picruresData = window.data.get();
    picturePreviewContainer.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    countComments.classList.add('hidden');
    loaderComments.classList.add('hidden');
    srcPicturePreview.src = picruresData[0].url;
    likes.textContent = picruresData[0].likes;
    amountComments.textContent = picruresData[0].comments.length;
    pictureDescription.textContent = picruresData[0].description;
    for (var i = 0; i < picruresData[0].comments.length; i++) {
      var itemComment = picruresData[0].comments[i];
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
})();
