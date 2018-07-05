'use strict';
(function () {
  var SLIDER_MAX = 453;
  var SLIDER_MIN = 0;

  var formReset = function () {
    tagsInput.value = '';
    descriptionArea.value = '';
    var noneEffectBtn = document.querySelector('#effect-none');
    noneEffectBtn.checked = true;
  };

  var showErrorMsg = function (errorMsgTxt) {
    var errorMsgTemplate = document.querySelector('.img-upload__message--error');
    var errorMsgElement = errorMsgTemplate.cloneNode(true);
    errorMsgElement.innerHTML = errorMsgTxt + '<div class="error__links"> <a class="error__link" href="index.html">Попробовать снова</a> <a class="error__link" href="index.html">Загрузить другой файл</a> </div>';
    errorMsgElement.classList.remove('hidden');
    errorMsgElement.style.zIndex = 2;
    var imgUpload = document.querySelector('.img-upload');
    imgUpload.appendChild(errorMsgElement);
  };
  //  Обработка слайдера эффекта
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevelLine = document.querySelector('.scale__level');
  var scaleLine = document.querySelector('.scale__line');

  var onScaleLineClick = function (ev) {
    updateSlider(ev.offsetX);
    window.uploadimageprocessing.setIntensity(window.upload.currentEffectName);
  };
  scaleLine.addEventListener('mouseup', onScaleLineClick);

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };
      startCoords = {
        x: moveEvt.clientX,
      };
      var shiftScale = (scalePin.offsetLeft - shift.x);
      updateSlider(shiftScale);
      window.uploadimageprocessing.setIntensity(window.upload.currentEffectName);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.uploadimageprocessing.setIntensity(window.upload.currentEffectName);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      scaleLine.addEventListener('mouseup', onScaleLineClick);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    scaleLine.removeEventListener('mouseup', onScaleLineClick);
  });

  var updateSlider = function (shift) {
    if (shift > SLIDER_MIN && shift <= SLIDER_MAX) {
      scaleLevelLine.style.width = shift + 'px';
      scalePin.style.left = shift + 'px';
    }
  };

  //  Изменение масштаба изображения
  var imgZoomValueChange = function (action) {
    var resizeControl = document.querySelector('.resize__control--value');
    var RESIZE_STEP = 25;
    var IMG_SIZE_MIN = 25;
    var IMG_SIZE_MAX = 100;
    var DEFAULT_ZOOM = 100;
    var resizeValue = parseInt(resizeControl.value, 10);

    switch (action) {
      case 'increase' :
        if (resizeValue < IMG_SIZE_MAX) {
          resizeValue += RESIZE_STEP;
        }
        break;
      case 'decrease' :
        if (resizeValue > IMG_SIZE_MIN) {
          resizeValue -= RESIZE_STEP;
        }
        break;
      case 'default' :
        resizeValue = DEFAULT_ZOOM;
        break;
    }
    window.upload.targetImage.style.transform = 'scale(' + resizeValue / 100 + ')';
    resizeControl.value = resizeValue + '%';
  };

  var controlPlus = document.querySelector('.resize__control--plus');
  controlPlus.addEventListener('click', function () {
    imgZoomValueChange('increase');
  });

  var controlMinus = document.querySelector('.resize__control--minus');
  controlMinus.addEventListener('click', function () {
    imgZoomValueChange('decrease');
  });

  //  Закрытие окна по крестику и ESC
  var cancel = document.getElementById('upload-cancel');
  cancel.addEventListener('click', function () {
    closeOverlay();
  });

  var closeOverlay = function () {
    window.upload.overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    window.upload.file.value = '';
    formReset();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.enums.KeyCode.ESC) {
      closeOverlay();
    }
  };

  //  Отключение закрытия окна по ESC в случае фокуса в поле тегов и описания
  var tagsInput = document.querySelector('.text__hashtags');
  tagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  tagsInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  var descriptionArea = document.querySelector('.text__description');
  descriptionArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  descriptionArea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  //  Работа с тегами
  var setDesriptionError = function () {
    descriptionArea.setCustomValidity('Мксимальная длина описнаия - 140 символов');
  };
  var imgEditForm = document.querySelector('.img-upload__form');
  imgEditForm.addEventListener('invalid', function () {
    setDesriptionError();
  });

  tagsInput.addEventListener('input', function () {
    tagAreaErrorReset();
  });

  var setTagError = function (message) {
    tagsInput.setCustomValidity(message);
    tagsInput.style.border = 'solid 3px red';
  };

  var tagAreaErrorReset = function () {
    tagsInput.setCustomValidity('');
    tagsInput.style.border = 'none';
  };

  var checkTags = function (tags) {
    tagAreaErrorReset();
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
  var submitButton = document.querySelector('.img-upload__submit');
  submitButton.addEventListener('click', function () {
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
  });

  imgEditForm.addEventListener('submit', function () {
    event.preventDefault();
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
    window.uploadService.send(new FormData(imgEditForm), closeOverlay, showErrorMsg);
  });

  //  Экспорт
  window.upload = {
    init: function () {
      window.upload.file.addEventListener('change', window.upload.openOverlay);
      window.upload.overlay.addEventListener('click', function () {
        if (event.target.name === 'effect') {
          window.uploadimageprocessing.setEffect(event.target.value);
          window.uploadimageprocessing.setIntensity(event.target.value);
        }
      });
    },
    openOverlay: function () {
      window.upload.overlay.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeydown);
      imgZoomValueChange('default');
      window.uploadimageprocessing.setEffect('none');
    },
    calculateProportion: function () {
      var scaleLineWidth = scaleLine.offsetWidth;
      var pinX = scalePin.offsetLeft;
      return (pinX / scaleLineWidth);
    },
    resetSlider: function () {
      scaleLevelLine.style.width = SLIDER_MAX + 'px';
      scalePin.style.left = SLIDER_MAX + 'px';
    },
    overlay: document.querySelector('.img-upload__overlay'),
    file: document.getElementById('upload-file'),
    targetImage: document.querySelector('.img-upload__preview'),
    currentEffectName: ''
  };
})();
