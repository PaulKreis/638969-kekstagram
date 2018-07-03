'use strict';
(function () {
  var WINDOW_WIDTH = 700;
  var WINDOW_HEIGHT = 155;
  var WINDOW_BACKGROUND = 'white';
  var WINDOW_HEADER_COLOR = 'black';
  var WINDOW_TEXT_COLOR = 'black';
  var WINDOW_HEADER_TEXT_SIZE = 30;
  var WINDOW_TEXT_TEXT_SIZE = 15;

  window.modal = function (header, text) {
    var modalWindow = document.createElement('div');
    modalWindow.style.width = WINDOW_WIDTH + 'px';
    modalWindow.style.height = WINDOW_HEIGHT + 'px';
    modalWindow.style.background = WINDOW_BACKGROUND;
    modalWindow.style.border = 'solid red 5px';
    modalWindow.style.borderRadius = '5px';
    modalWindow.style.position = 'absolute';
    modalWindow.style.top = 0;
    modalWindow.style.bottom = 0;
    modalWindow.style.left = 0;
    modalWindow.style.right = 0;
    modalWindow.style.margin = 'auto';
    modalWindow.style.zIndex = '999';

    var modalWindowHeader = document.createElement('p');
    modalWindowHeader.style.fontSize = WINDOW_HEADER_TEXT_SIZE + 'px';
    modalWindowHeader.style.color = WINDOW_HEADER_COLOR;
    modalWindowHeader.style.textAlign = 'center';
    modalWindowHeader.textContent = header;

    var modalWindowText = document.createElement('p');
    modalWindowText.style.fontSize = WINDOW_TEXT_TEXT_SIZE + 'px';
    modalWindowText.style.color = WINDOW_TEXT_COLOR;
    modalWindowText.style.textAlign = 'center';
    modalWindowText.textContent = text;
    modalWindow.appendChild(modalWindowHeader);
    modalWindow.appendChild(modalWindowText);
    var commentsElement = document.body;

    commentsElement.appendChild(modalWindow);

    var modalClick = function () {
      document.removeEventListener('click', modalClick);
      commentsElement.removeChild(modalWindow);
    };

    document.addEventListener('click', modalClick);
  };
})();
