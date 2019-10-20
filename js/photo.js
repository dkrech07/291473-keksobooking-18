'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HEIGHT_AVATAR = 70;
  var WIDTH_AVATAR = 70;

  window.avatarPreview = document.querySelector('.ad-form-header__preview img');

  var avatarFileChooser = document.querySelector('.ad-form__field #avatar');
  var photoFileChooser = document.querySelector('.ad-form__upload #images');
  var photoWrapper = document.querySelector('.ad-form__photo');

  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoFileChooser.addEventListener('change', function () {
    var file = photoFileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var newPhoto = photoWrapper.cloneNode(true);
      newPhoto.classList.add('advertisement__photo');
      var photo = document.createElement('img');
      newPhoto.appendChild(photo);
      photo.style = 'width: ' + WIDTH_AVATAR + 'px;' + 'height: ' + HEIGHT_AVATAR + 'px;';
      photoWrapper.before(newPhoto);

      var photoPreview = newPhoto.querySelector('img');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        photoPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
