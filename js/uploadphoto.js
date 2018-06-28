'use strict';
(function () {
  var SLIDER_MAX = 453;
  var SLIDER_MIN = 0;

  var uploadOverlay = document.querySelector('.img-upload__overlay');

  window.uploadPhoto = {
    openUploadOverlay: function () {
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onUploadOverlayEscPress);
      imgZoomValueChange('default');
      addEffect('none');
    },
    uploadFile: document.getElementById('upload-file')
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
    window.uploadPhoto.uploadFile.value = '';
  };

  var uploadCancel = document.getElementById('upload-cancel');
  uploadCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  //  Закрытие окна редактирования по нажатию Esc
  var onUploadOverlayEscPress = function (evt) {
    if (evt.keyCode === window.enums.ESC_KEYCODE) {
      closeUploadOverlay();
    }
  };
  //  Наложение эффекта на изображение
  var targetImage = document.querySelector('.img-upload__preview');
  var addFilter = function (filterName, proportion) {
    var scaleValue = uploadOverlay.querySelector('.scale__value');
    var filter = '';
    var intense;
    switch (filterName) {
      case 'chrome' :
        intense = proportion.toFixed(2);
        filter = 'grayscale(' + intense + ')';
        break;
      case 'sepia' :
        intense = proportion.toFixed(2);
        filter = 'sepia(' + intense + ')';
        break;
      case 'marvin' :
        intense = proportion.toFixed(2) * 100;
        filter = 'invert(' + intense + '%)';
        break;
      case 'phobos' :
        intense = proportion.toFixed(3) * 3;
        filter = 'blur(' + intense + 'px)';
        break;
      case 'heat' :
        intense = proportion.toFixed(2) * 3;
        filter = 'brightness(' + intense + ')';
        break;
      default :
        filter = 'none';
    }
    scaleValue.textContent = intense;
    targetImage.style.filter = filter;
  };

  var removeFilter = function () {
    targetImage.style.filter = '';
  };

  var currentEffectName = '';
  var addEffect = function (effectName) {
    removeFilter();
    resetEffectSlider();
    var controlScale = uploadOverlay.querySelector('.img-upload__scale');
    targetImage.classList.remove('effects__preview--' + currentEffectName);
    targetImage.classList.add('effects__preview--' + effectName);
    currentEffectName = effectName;
    if (effectName === 'none') {
      controlScale.classList.add('hidden');
    } else {
      controlScale.classList.remove('hidden');
    }
  };

  uploadOverlay.addEventListener('click', function () {
    if (event.target.name === 'effect') {
      addEffect(event.target.value);
      imgEffectUpdate();
    }
  });

  //  Ползунок
  var scalePin = uploadOverlay.querySelector('.scale__pin');
  var scaleLevelLine = uploadOverlay.querySelector('.scale__level');
  var scaleLine = uploadOverlay.querySelector('.scale__line');

  var onScaleLineClick = function (ev) {
    sliderUpdate(ev.offsetX);
    imgEffectUpdate();
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
      sliderUpdate(shiftScale);
      imgEffectUpdate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      imgEffectUpdate();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      scaleLine.addEventListener('mouseup', onScaleLineClick);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    scaleLine.removeEventListener('mouseup', onScaleLineClick);
  });

  var sliderUpdate = function (shift) {
    if (shift > SLIDER_MIN && shift <= SLIDER_MAX) {
      scaleLevelLine.style.width = shift + 'px';
      scalePin.style.left = shift + 'px';
    }
  };

  var imgEffectUpdate = function () {
    var scaleLineWidth = scaleLine.offsetWidth;
    var pinX = scalePin.offsetLeft;
    var proportion = (pinX / scaleLineWidth);
    addFilter(currentEffectName, proportion);
  };

  var resetEffectSlider = function () {
    scaleLevelLine.style.width = SLIDER_MAX + 'px';
    scalePin.style.left = SLIDER_MAX + 'px';
  };

  //  Изменение масштаба
  var imgZoomValueChange = function (action) {
    var controlValue = uploadOverlay.querySelector('.resize__control--value');
    var RESIZE_STEP = 25;
    var IMG_SIZE_MIN = 25;
    var IMG_SIZE_MAX = 100;
    var DEFAULT_ZOOM = 100;
    var resizeValueNum = parseInt(controlValue.value, 10);

    switch (action) {
      case 'increase' :
        if (resizeValueNum < IMG_SIZE_MAX) {
          resizeValueNum += RESIZE_STEP;
        }
        break;
      case 'decrease' :
        if (resizeValueNum > IMG_SIZE_MIN) {
          resizeValueNum -= RESIZE_STEP;
        }
        break;
      case 'default' :
        resizeValueNum = DEFAULT_ZOOM;
        break;
    }

    targetImage.style.transform = 'scale(' + resizeValueNum / 100 + ')';
    controlValue.value = resizeValueNum + '%';
  };

  var controlPlus = uploadOverlay.querySelector('.resize__control--plus');
  controlPlus.addEventListener('click', function () {
    imgZoomValueChange('increase');
  });

  var controlMinus = uploadOverlay.querySelector('.resize__control--minus');
  controlMinus.addEventListener('click', function () {
    imgZoomValueChange('decrease');
  });

  //  #16 Личный проект: доверяй, но проверяй
  //  если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы
  var textHashtagsArea = document.querySelector('.text__hashtags');
  textHashtagsArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });

  textHashtagsArea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });

  //  если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы
  var textDescriptionArea = document.querySelector('.text__description');
  textDescriptionArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  });

  textDescriptionArea.addEventListener('focusout', function () {
    document.addEventListener('keydown', onUploadOverlayEscPress);
  });

  //  2.3. Хэш-теги
  var submitButton = document.querySelector('.img-upload__submit');
  submitButton.addEventListener('click', function () {
    var hashtagsArray = textHashtagsArea.value.split(' ');
    hashtagsCheck(hashtagsArray);
  });

  var imgEditForm = document.querySelector('.img-upload__form');
  imgEditForm.addEventListener('submit', function () {
    var hashtagsArray = textHashtagsArea.value.split(' ');
    hashtagsCheck(hashtagsArray);
  });

  imgEditForm.addEventListener('invalid', function () {
    setDesriptionError();
  });

  submitButton.addEventListener('click', function () {
    var hashtagsArray = textHashtagsArea.value.split(' ');
    hashtagsCheck(hashtagsArray);
  });

  textHashtagsArea.addEventListener('input', function () {
    hashtagAreaErrorReset();
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

  var setHashtagError = function (message) {
    textHashtagsArea.setCustomValidity(message);
    textHashtagsArea.style.border = 'solid 3px red';
  };

  var setDesriptionError = function () {
    textDescriptionArea.setCustomValidity('Мксимальная длина описнаия - 140 символов');
  };

  var hashtagAreaErrorReset = function () {
    textHashtagsArea.setCustomValidity('');
    textHashtagsArea.style.border = 'none';
  };

  var hashtagsCheck = function (hashtags) {
    hashtagAreaErrorReset();
    hashtags.forEach(function (hashtag) {
      if (hashtag === '') {
        textHashtagsArea.setCustomValidity('');
      } else if (hashtag.charAt(0) !== '#') {
        setHashtagError('Хэш-тег начинается с символа # (решётка)');
      } else if (hashtag === '#') {
        setHashtagError('Хеш-тег не может состоять только из одной решётки');
      } else if (hashtags.length > 5) {
        setHashtagError('Нельзя указать больше пяти хэш-тегов');
      } else if (hashtag.length > 20) {
        setHashtagError('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (checkContains(hashtags, hashtag) !== 1) {
        setHashtagError('Один и тот же хэш-тег не может быть использован дважды');
      }
    });
  };
})();
