'use strict';
(function () {
  var ERROR_ZINDEX = 2;

  var resetForm = function () {
    tagsInput.value = '';
    descriptionArea.value = '';
    var noneEffect = document.querySelector('#effect-none');
    noneEffect.checked = true;
  };

  var showErrorMsg = function (errorMsgTxt) {
    var errorMsgTemplate = document.querySelector('.img-upload__message--error');
    var errorMsg = errorMsgTemplate.cloneNode(true);
    errorMsg.innerHTML = errorMsgTxt + '<div class="error__links"> <a class="error__link" href="index.html">Попробовать снова</a> <a class="error__link" href="index.html">Загрузить другой файл</a> </div>';
    errorMsg.classList.remove('hidden');
    errorMsg.style.zIndex = ERROR_ZINDEX;
    var imgUpload = document.querySelector('.img-upload');
    imgUpload.appendChild(errorMsg);
  };

  //  Закрытие окна по крестику и ESC
  var cancel = document.getElementById('upload-cancel');
  cancel.addEventListener('click', function () {
    closeOverlay();
  });

  var closeOverlay = function () {
    window.upload.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeyDown);
    window.upload.file.value = '';
    resetForm();
  };

  var onDocumentKeyDown = function (evt) {
    if (evt.keyCode === window.enums.KeyCode.ESC) {
      closeOverlay();
    }
  };

  //  Отключение закрытия окна по ESC в случае фокуса в поле тегов и описания
  var tagsInput = document.querySelector('.text__hashtags');
  tagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  tagsInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeyDown);
  });

  var descriptionArea = document.querySelector('.text__description');
  descriptionArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeyDown);
  });

  descriptionArea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeyDown);
  });

  //  Работа с тегами
  var setDescriptionError = function () {
    descriptionArea.setCustomValidity('Мксимальная длина описнаия - 140 символов');
  };
  var imgEditForm = document.querySelector('.img-upload__form');
  imgEditForm.addEventListener('invalid', function () {
    setDescriptionError();
  });

  tagsInput.addEventListener('input', function () {
    resetTagAreaError();
  });

  var setTagError = function (message) {
    tagsInput.setCustomValidity(message);
    tagsInput.style.border = 'solid 3px red';
  };

  var resetTagAreaError = function () {
    tagsInput.setCustomValidity('');
    tagsInput.style.border = 'none';
  };

  var checkTags = function (tags) {
    resetTagAreaError();
    tags.forEach(function (tag) {
      if (tag === '') {
        tagsInput.setCustomValidity('');
      } else if (tag.charAt(0) !== '#') {
        setTagError('Хэш-тег начинается с символа # (решётка)');
      } else if (tag === '#') {
        setTagError('Хеш-тег не может состоять только из одной решётки');
      } else if (tags.length > 5) {
        setTagError('Нельзя указать больше пяти хэш-тегов');
      } else if (tag.length > 20) {
        setTagError('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (window.utils.checkContains(tags, tag) !== 1) {
        setTagError('Один и тот же хэш-тег не может быть использован дважды');
      }
    });
  };

  //  Отправка формы
  var submit = document.querySelector('.img-upload__submit');
  submit.addEventListener('click', function () {
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
  });

  imgEditForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
    window.uploadService.send(new FormData(imgEditForm), closeOverlay, showErrorMsg);
  });

  //  Экспорт
  window.upload = {
    init: function () {
      window.upload.file.addEventListener('change', window.upload.openOverlay);
      window.upload.overlay.addEventListener('click', function (evt) {
        if (evt.target.name === 'effect') {
          window.photoEditor.setEffect(evt.target.value);
          window.photoEditor.setIntensity(evt.target.value);
        }
      });
    },
    openOverlay: function () {
      window.upload.overlay.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeyDown);
      window.photoEditor.changeImgZoomValue('default');
      window.photoEditor.setEffect('none');
    },
    overlay: document.querySelector('.img-upload__overlay'),
    file: document.getElementById('upload-file'),
    targetImage: document.querySelector('.img-upload__preview'),
    currentEffectName: ''
  };
})();
