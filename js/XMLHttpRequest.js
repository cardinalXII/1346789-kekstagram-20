'use strict';

(function () {
  window.load = function () {
    var address = window.constants.urlxml;
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.createPhotoX(xhr.response);
      }
    });

    xhr.open('GET', address);
    xhr.send();
  };
  window.load();

  window.upload = function (data) {
    var sendAddress = window.constants.urlsend;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          window.onSuccess();
          break;
        default:
          window.onError();
      }
    });

    xhr.addEventListener('error', function () {
      window.onError();
    });
    xhr.open('POST', sendAddress);

    xhr.send(data);
  };
})();
