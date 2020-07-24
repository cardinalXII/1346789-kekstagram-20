'use strict';

(function () {
  window.load = function (url) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.creatingPhotoX(xhr.response);
      }
    });

    xhr.open('GET', url);
    xhr.send();
    console.log(xhr);
  };

  window.load('https://javascript.pages.academy/kekstagram/data');


  window.upload = function (data, onSuccess) {
    var URL = 'https://javascript.pages.academy/kekstagram';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.send(data);
    console.log(xhr);
  };
})();
