'use strict';
(function () {
  var WIDTH = 700;
  var HEIGHT = 155;
  var headerSize = 30;
  var contentSize = 15;

  window.modalError = {
    render: function (headerText, contentText) {
      var wrapper = document.createElement('div');
      wrapper.style.width = WIDTH + 'px';
      wrapper.style.height = HEIGHT + 'px';
      wrapper.style.background = 'white';
      wrapper.style.border = 'solid red 5px';
      wrapper.style.borderRadius = '5px';
      wrapper.style.position = 'absolute';
      wrapper.style.top = 0;
      wrapper.style.bottom = 0;
      wrapper.style.left = 0;
      wrapper.style.right = 0;
      wrapper.style.margin = 'auto';
      wrapper.style.zIndex = '3';

      var header = document.createElement('p');
      header.style.fontSize = headerSize + 'px';
      header.style.color = 'black';
      header.style.textAlign = 'center';
      header.textContent = headerText;

      var content = document.createElement('p');
      content.style.fontSize = contentSize + 'px';
      content.style.color = 'black';
      content.style.textAlign = 'center';
      content.textContent = contentText;
      wrapper.appendChild(header);
      wrapper.appendChild(content);
      document.body.appendChild(wrapper);

      var onModalClick = function () {
        document.removeEventListener('click', onModalClick);
        document.body.removeChild(wrapper);
      };

      document.addEventListener('click', onModalClick);
    }
  };
})();
