'use strict';
(function () {
  var ERROR_ZINDEX = 2;
  var SUPPORTED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
  var onCancelClik = function () {
    closeOverlay();
  };

  var closeOverlay = function () {
    window.upload.overlay.classList.add('hidden');
    window.upload.file.value = '';
    resetForm();
    //  Удаляю слушателей
    document.removeEventListener('keydown', onDocumentKeyDown);
    tagsInput.removeEventListener('focus', onAreaFocus);
    tagsInput.removeEventListener('focusout', onAreaFocusOut);
    descriptionArea.removeEventListener('focus', onAreaFocus);
    descriptionArea.removeEventListener('focusout', onAreaFocusOut);
    cancel.removeEventListener('click', onCancelClik);
    imgEditForm.removeEventListener('invalid', onFormInvalid);
    tagsInput.removeEventListener('input', onTagsInput);
    submit.removeEventListener('click', onSubmitClick);
    imgEditForm.removeEventListener('submit', onFormSubmit);
    window.upload.overlay.removeEventListener('click', onOverlayClick);

  };

  var onDocumentKeyDown = function (evt) {
    if (evt.keyCode === window.enums.KeyCode.ESC) {
      closeOverlay();
    }
  };

  //  Отключение закрытия окна по ESC в случае фокуса в поле тегов и описания
  var onAreaFocus = function () {
    document.removeEventListener('keydown', onDocumentKeyDown);
  };

  var onAreaFocusOut = function () {
    document.addEventListener('keydown', onDocumentKeyDown);
  };

  var tagsInput = document.querySelector('.text__hashtags');
  var descriptionArea = document.querySelector('.text__description');

  //  Работа с тегами
  var setDescriptionError = function () {
    descriptionArea.setCustomValidity('Мксимальная длина описнаия - 140 символов');
  };
  var imgEditForm = document.querySelector('.img-upload__form');

  var onFormInvalid = function () {
    setDescriptionError();
  };

  var onTagsInput = function () {
    resetTagAreaError();
  };

  var setTagError = function (message) {
    tagsInput.setCustomValidity(message);
    tagsInput.style.border = 'solid 3px red';
  };

  var resetTagAreaError = function () {
    tagsInput.setCustomValidity('');
    tagsInput.style.border = 'none';
  };

  var onOverlayClick = function (evt) {
    if (evt.target.name === 'effect') {
      window.photoEditor.setEffect(evt.target.value);
      window.photoEditor.setIntensity(evt.target.value);
    }
  };

  var checkTags = function (tags) {
    var trimTags = tags.trim();
    var tagsArray = trimTags.split(' ');
    var result = window.utils.isEmptyString(tagsArray);
    resetTagAreaError();
    result.forEach(function (tag) {
      if (tag === '') {
        tagsInput.setCustomValidity('');
      } else if (tag.charAt(0) !== '#') {
        setTagError('Хэш-тег начинается с символа # (решётка)');
      } else if (tag === '#') {
        setTagError('Хеш-тег не может состоять только из одной решётки');
      } else if (result.length > 5) {
        setTagError('Нельзя указать больше пяти хэш-тегов');
      } else if (tag.length > 20) {
        setTagError('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (window.utils.checkContains(result, tag) !== 1) {
        setTagError('Один и тот же хэш-тег не может быть использован дважды');
      }
    });
  };

  //  Отправка формы
  var submit = document.querySelector('.img-upload__submit');
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    checkTags(tagsInput.value);
    window.uploadService.send(new FormData(imgEditForm), closeOverlay, showErrorMsg);
  };

  var onSubmitClick = function () {
    checkTags(tagsInput.value);
  };

  var changeImage = function (file) {
    if (isFileSupported(file.name)) {
      setImageSource(file);
      window.upload.openOverlay();
    } else {
      window.modalError.render('Поддерживаются только картинки', 'Поддерживаемые разрешения: ' + SUPPORTED_FILE_TYPES.join(', ') + '.');
    }
  };

  var setImageSource = function (file) {
    var previewImage = window.upload.targetImage.getElementsByTagName('img')[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  var isFileSupported = function (fileName) {
    var fileNameNormalized = fileName.toLowerCase();
    var isSupported = SUPPORTED_FILE_TYPES.some(function (fileType) {
      return fileNameNormalized.endsWith(fileType);
    });
    return isSupported;
  };

  //  Экспорт
  window.upload = {
    overlay: document.querySelector('.img-upload__overlay'),
    file: document.getElementById('upload-file'),
    targetImage: document.querySelector('.img-upload__preview'),
    currentEffectName: '',
    init: function () {
      window.upload.file.addEventListener('change', function (evt) {
        changeImage(evt.target.files[0]);
      });
    },
    openOverlay: function () {
      window.upload.overlay.classList.remove('hidden');
      window.photoEditor.changeImgZoomValue('default');
      window.photoEditor.setEffect('none');
      resetTagAreaError();
      //  Добавляю слушателей
      document.addEventListener('keydown', onDocumentKeyDown);
      tagsInput.addEventListener('focus', onAreaFocus);
      tagsInput.addEventListener('focusout', onAreaFocusOut);
      descriptionArea.addEventListener('focus', onAreaFocus);
      descriptionArea.addEventListener('focusout', onAreaFocusOut);
      tagsInput.addEventListener('input', onTagsInput);
      imgEditForm.addEventListener('invalid', onFormInvalid);
      cancel.addEventListener('click', onCancelClik);
      submit.addEventListener('click', onSubmitClick);
      imgEditForm.addEventListener('submit', onFormSubmit);
      window.upload.overlay.addEventListener('click', onOverlayClick);
    }
  };
})();
