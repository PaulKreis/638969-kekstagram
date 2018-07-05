'use strict';
(function () {
  var SLIDER_MAX = 453;
  var SLIDER_MIN = 0;

  var overlay = document.querySelector('.img-upload__overlay');


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

  var closeOverlay = function () {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    window.upload.file.value = '';
    formReset();
  };

  var cancel = document.getElementById('upload-cancel');
  cancel.addEventListener('click', function () {
    closeOverlay();
  });

  //  Закрытие окна редактирования по нажатию Esc
  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === window.enums.KeyCode.ESC) {
      closeOverlay();
    }
  };
  //  Наложение эффекта на изображение
  var targetImage = document.querySelector('.img-upload__preview');
  var setIntensity = function (filterName) {
    var scaleValue = overlay.querySelector('.scale__value');
    var filter = '';
    var intense;
    switch (filterName) {
      case 'chrome' :
        intense = calculateProtortion().toFixed(2);
        filter = 'grayscale(' + intense + ')';
        break;
      case 'sepia' :
        intense = calculateProtortion().toFixed(2);
        filter = 'sepia(' + intense + ')';
        break;
      case 'marvin' :
        intense = calculateProtortion().toFixed(2) * 100;
        filter = 'invert(' + intense + '%)';
        break;
      case 'phobos' :
        intense = calculateProtortion().toFixed(3) * 3;
        filter = 'blur(' + intense + 'px)';
        break;
      case 'heat' :
        intense = calculateProtortion().toFixed(2) * 3;
        filter = 'brightness(' + intense + ')';
        break;
      default :
        filter = 'none';
    }
    scaleValue.textContent = intense;
    targetImage.style.filter = filter;
  };

  var resetIntensity = function () {
    targetImage.style.filter = '';
  };

  var currentEffectName = '';
  var setEffect = function (effectName) {
    resetIntensity();
    resetSlider();
    var controlScale = overlay.querySelector('.img-upload__scale');
    targetImage.classList.remove('effects__preview--' + currentEffectName);
    targetImage.classList.add('effects__preview--' + effectName);
    currentEffectName = effectName;
    if (effectName === 'none') {
      controlScale.classList.add('hidden');
    } else {
      controlScale.classList.remove('hidden');
    }
  };

  //  Ползунок
  var scalePin = overlay.querySelector('.scale__pin');
  var scaleLevelLine = overlay.querySelector('.scale__level');
  var scaleLine = overlay.querySelector('.scale__line');

  var onScaleLineClick = function (ev) {
    updateSlider(ev.offsetX);
    setIntensity(currentEffectName);
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
      setIntensity(currentEffectName);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setIntensity();
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

  var calculateProtortion = function () {
    var scaleLineWidth = scaleLine.offsetWidth;
    var pinX = scalePin.offsetLeft;
    return (pinX / scaleLineWidth);
  };

  var resetSlider = function () {
    scaleLevelLine.style.width = SLIDER_MAX + 'px';
    scalePin.style.left = SLIDER_MAX + 'px';

  };

  //  Изменение масштаба
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

    targetImage.style.transform = 'scale(' + resizeValue / 100 + ')';
    resizeControl.value = resizeValue + '%';
  };

  var controlPlus = overlay.querySelector('.resize__control--plus');
  controlPlus.addEventListener('click', function () {
    imgZoomValueChange('increase');
  });

  var controlMinus = overlay.querySelector('.resize__control--minus');
  controlMinus.addEventListener('click', function () {
    imgZoomValueChange('decrease');
  });

  //  #16 Личный проект: доверяй, но проверяй
  //  если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  var tagsInput = document.querySelector('.text__hashtags');
  tagsInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  tagsInput.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  //  если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  var descriptionArea = document.querySelector('.text__description');
  descriptionArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  descriptionArea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  //  2.3. Хэш-теги
  var submitButton = document.querySelector('.img-upload__submit');
  submitButton.addEventListener('click', function () {
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
  });

  var imgEditForm = document.querySelector('.img-upload__form');
  imgEditForm.addEventListener('submit', function () {
    event.preventDefault();
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
    window.uploadService.send(new FormData(imgEditForm), closeOverlay, showErrorMsg);
  });

  imgEditForm.addEventListener('invalid', function () {
    setDesriptionError();
  });

  submitButton.addEventListener('click', function () {
    var tagsArray = tagsInput.value.split(' ');
    checkTags(tagsArray);
  });

  tagsInput.addEventListener('input', function () {
    tagAreaErrorReset();
  });

  function checkContains(arr, elem) {
    var numberOfElem = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].toUpperCase() === elem.toUpperCase()) {
        numberOfElem++;
      }
    }
    return numberOfElem;
  }

  var setTagError = function (message) {
    tagsInput.setCustomValidity(message);
    tagsInput.style.border = 'solid 3px red';
  };

  var setDesriptionError = function () {
    descriptionArea.setCustomValidity('Мксимальная длина описнаия - 140 символов');
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
      } else if (checkContains(tags, tag) !== 1) {
        setTagError('Один и тот же хэш-тег не может быть использован дважды');
      }
    });
  };

  window.upload = {
    openOverlay: function () {
      overlay.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentKeydown);
      imgZoomValueChange('default');
      setEffect('none');
    },
    file: document.getElementById('upload-file'),
    init: function () {
      window.upload.file.addEventListener('change', window.upload.openOverlay);
      overlay.addEventListener('click', function () {
        if (event.target.name === 'effect') {
          setEffect(event.target.value);
          setIntensity(event.target.value);
        }
      });
    }
  };
})();
