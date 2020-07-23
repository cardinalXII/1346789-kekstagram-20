'use strict';

(function () {
  window.load = function (url) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.creatingphotoX(xhr.response);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

window.load('https://javascript.pages.academy/kekstagram/data');

