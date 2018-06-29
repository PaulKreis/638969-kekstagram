'use strict';
(function () {
  window.gallery = {
    render: function (photos, target) {
      var picturesFragment = document.createDocumentFragment();

      photos.forEach(function (photo) {
        window.picture.render(picturesFragment, photo);
      });

      target.appendChild(picturesFragment);
    }
  };
})();
