'use strict';

(function () {

  var photoContainer = document.querySelector('.form__photo-container .upload');
  var draggedItem = null;

  photoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });


  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  photoContainer.addEventListener('drop', function (evt) {
    if (draggedItem.offsetLeft > evt.target.offsetLeft) {
      photoContainer.insertBefore(draggedItem, evt.target);
    } else {
      photoContainer.insertBefore(draggedItem, evt.target.nextSibling);
    }
    evt.preventDefault();
  });
  photoContainer.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoContainer.addEventListener('dragleave', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
    }
    evt.preventDefault();
  });
})();
