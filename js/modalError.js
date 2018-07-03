'use strict';
(function () {
  var WIDTH = 700;
  var HEIGHT = 155;
  var BACKGROUND = 'white';
  var HEADER_COLOR = 'black';
  var TEXT_COLOR = 'black';
  var HEADER_TEXT_SIZE = 30;
  var CONTENT_TEXT_SIZE = 15;

  window.modalError = {
    render: function (header, text) {
      var modalWindow = document.createElement('div');
      modalWindow.style.width = WIDTH + 'px';
      modalWindow.style.height = HEIGHT + 'px';
      modalWindow.style.background = BACKGROUND;
      modalWindow.style.border = 'solid red 5px';
      modalWindow.style.borderRadius = '5px';
      modalWindow.style.position = 'absolute';
      modalWindow.style.top = 0;
      modalWindow.style.bottom = 0;
      modalWindow.style.left = 0;
      modalWindow.style.right = 0;
      modalWindow.style.margin = 'auto';
      modalWindow.style.zIndex = '3';

      var modalWindowHeader = document.createElement('p');
      modalWindowHeader.style.fontSize = HEADER_TEXT_SIZE + 'px';
      modalWindowHeader.style.color = HEADER_COLOR;
      modalWindowHeader.style.textAlign = 'center';
      modalWindowHeader.textContent = header;

      var modalWindowText = document.createElement('p');
      modalWindowText.style.fontSize = CONTENT_TEXT_SIZE + 'px';
      modalWindowText.style.color = TEXT_COLOR;
      modalWindowText.style.textAlign = 'center';
      modalWindowText.textContent = text;
      modalWindow.appendChild(modalWindowHeader);
      modalWindow.appendChild(modalWindowText);
      var bodyElement = document.body;
      bodyElement.appendChild(modalWindow);

      var modalClick = function () {
        document.removeEventListener('click', modalClick);
        bodyElement.removeChild(modalWindow);
      };

      document.addEventListener('click', modalClick);
    }
  };
})();
