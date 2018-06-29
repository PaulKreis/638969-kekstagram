'use strict';
(function () {
  var WINDOW_WIDTH = 700;
  var WINDOW_HEIGHT = 155;
  var WINDOW_BACKGROUND = 'white';
  var WINDOW_HEADER_COLOR = 'black';
  var WINDOW_TEXT_COLOR = 'black';
  var WINDOW_HEADER_TEXT_SIZE = 30;
  var WINDOW_TEXT_TEXT_SIZE = 15;

  window.generateWindow = function (header, text) {
    var generatedWindow = document.createElement('div');
    generatedWindow.style.width = WINDOW_WIDTH + 'px';
    generatedWindow.style.height = WINDOW_HEIGHT + 'px';
    generatedWindow.style.background = WINDOW_BACKGROUND;
    generatedWindow.style.border = 'solid red 5px';
    generatedWindow.style.borderRadius = '5px';
    generatedWindow.style.position = 'absolute';
    generatedWindow.style.top = 0;
    generatedWindow.style.bottom = 0;
    generatedWindow.style.left = 0;
    generatedWindow.style.right = 0;
    generatedWindow.style.margin = 'auto';
    generatedWindow.style.zIndex = '999';

    var generatedWindowHeader = document.createElement('p');
    generatedWindowHeader.style.fontSize = WINDOW_HEADER_TEXT_SIZE + 'px';
    generatedWindowHeader.style.color = WINDOW_HEADER_COLOR;
    generatedWindowHeader.style.textAlign = 'center';
    generatedWindowHeader.textContent = header;

    var generatedWindowText = document.createElement('p');
    generatedWindowText.style.fontSize = WINDOW_TEXT_TEXT_SIZE + 'px';
    generatedWindowText.style.color = WINDOW_TEXT_COLOR;
    generatedWindowText.style.textAlign = 'center';
    generatedWindowText.textContent = text;

    generatedWindow.appendChild(generatedWindowHeader);
    generatedWindow.appendChild(generatedWindowText);
    var commentsElement = document.body;

    commentsElement.appendChild(generatedWindow);

    var generateWindowClick = function () {
      document.removeEventListener('click', generateWindowClick);
      commentsElement.removeChild(generatedWindow);
    };
    document.addEventListener('click', generateWindowClick);
  };
})();
