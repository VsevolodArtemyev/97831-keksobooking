'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container .upload');

  var templatePhoto = document.createElement('img');
  templatePhoto.classList.add('uploaded-photo');
  templatePhoto.draggable = 'true';

  fileChooser.addEventListener('change', function () {
    var files = fileChooser.files;

    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();
      var matches = FILE_TYPES.some(function (elem) {
        return fileName.endsWith(elem);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var newPhoto = templatePhoto.cloneNode();
          newPhoto.src = reader.result;
          photoContainer.insertBefore(newPhoto, photoContainer.firstChild);
        });
        reader.readAsDataURL(files[i]);
      }
    }
  });
})();
