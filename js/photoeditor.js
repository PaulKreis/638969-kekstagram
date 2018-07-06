'use strict';
(function () {
  var SLIDER_MAX = 453;
  var SLIDER_MIN = 0;
  var RESIZE_STEP = 25;
  var IMG_SIZE_MIN = 25;
  var IMG_SIZE_MAX = 100;
  var DEFAULT_ZOOM = 100;

  var controlPlus = document.querySelector('.resize__control--plus');
  controlPlus.addEventListener('click', function () {
    window.photoEditor.imgZoomValueChange('increase');
  });

  var controlMinus = document.querySelector('.resize__control--minus');
  controlMinus.addEventListener('click', function () {
    window.photoEditor.imgZoomValueChange('decrease');
  });
  var calculateProportion = function () {
    var scaleLineWidth = scaleLine.offsetWidth;
    var pinX = scalePin.offsetLeft;
    return (pinX / scaleLineWidth);
  };
  var resetSlider = function () {
    scaleLevelLine.style.width = SLIDER_MAX + 'px';
    scalePin.style.left = SLIDER_MAX + 'px';
  };
  //  Обработка слайдера эффекта
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevelLine = document.querySelector('.scale__level');
  var scaleLine = document.querySelector('.scale__line');

  var onScaleLineClick = function (ev) {
    updateSlider(ev.offsetX);
    window.photoEditor.setIntensity(window.upload.currentEffectName);
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
      window.photoEditor.setIntensity(window.upload.currentEffectName);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.photoEditor.setIntensity(window.upload.currentEffectName);
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

  window.photoEditor = {
    setIntensity: function (filterName) {
      var scaleValue = document.querySelector('.scale__value');
      var filter = '';
      var intense;
      switch (filterName) {
        case 'chrome' :
          intense = calculateProportion().toFixed(2);
          filter = 'grayscale(' + intense + ')';
          break;
        case 'sepia' :
          intense = calculateProportion().toFixed(2);
          filter = 'sepia(' + intense + ')';
          break;
        case 'marvin' :
          intense = calculateProportion().toFixed(2) * 100;
          filter = 'invert(' + intense + '%)';
          break;
        case 'phobos' :
          intense = calculateProportion().toFixed(2) * 3;
          filter = 'blur(' + intense + 'px)';
          break;
        case 'heat' :
          intense = calculateProportion().toFixed(2) * 3;
          filter = 'brightness(' + intense + ')';
          break;
        default :
          filter = 'none';
      }
      scaleValue.value = calculateProportion().toFixed(2) * 100;
      window.upload.targetImage.style.filter = filter;
    },
    resetIntensity: function () {
      window.upload.targetImage.style.filter = '';
    },
    setEffect: function (effectName) {
      this.resetIntensity();
      resetSlider();
      var controlScale = window.upload.overlay.querySelector('.img-upload__scale');
      window.upload.targetImage.classList.remove('effects__preview--' + window.upload.currentEffectName);
      window.upload.targetImage.classList.add('effects__preview--' + effectName);
      window.upload.currentEffectName = effectName;
      if (effectName === 'none') {
        controlScale.classList.add('hidden');
      } else {
        controlScale.classList.remove('hidden');
      }
    },
    imgZoomValueChange: function (action) {
      var resizeControl = document.querySelector('.resize__control--value');
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
    }
  };
})();
