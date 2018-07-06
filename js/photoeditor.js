'use strict';
(function () {
  window.photoEditor = {
    setIntensity: function (filterName) {
      var scaleValue = document.querySelector('.scale__value');
      var filter = '';
      var intense;
      switch (filterName) {
        case 'chrome' :
          intense = window.upload.calculateProportion().toFixed(2);
          filter = 'grayscale(' + intense + ')';
          break;
        case 'sepia' :
          intense = window.upload.calculateProportion().toFixed(2);
          filter = 'sepia(' + intense + ')';
          break;
        case 'marvin' :
          intense = window.upload.calculateProportion().toFixed(2) * 100;
          filter = 'invert(' + intense + '%)';
          break;
        case 'phobos' :
          intense = window.upload.calculateProportion().toFixed(2) * 3;
          filter = 'blur(' + intense + 'px)';
          break;
        case 'heat' :
          intense = window.upload.calculateProportion().toFixed(2) * 3;
          filter = 'brightness(' + intense + ')';
          break;
        default :
          filter = 'none';
      }
      scaleValue.value = window.upload.calculateProportion().toFixed(2) * 100;
      window.upload.targetImage.style.filter = filter;
    },
    setEffect: function (effectName) {
      window.photoEditor.resetIntensity();
      window.upload.resetSlider();
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
    resetIntensity: function () {
      window.upload.targetImage.style.filter = '';
    }
  };
})();
