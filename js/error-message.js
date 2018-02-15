'use strict';

(function () {
  window.showErrorMessage = function (errorMessage) {
    var notificationNode = document.querySelector('.error-message');
    var notificationText = notificationNode.querySelector('.error-message__message');
    var notificationCloseBtn = notificationNode.querySelector('.error-message__close');

    notificationNode.classList.remove('hidden');
    notificationText.textContent = errorMessage;

    var onCloseNotification = function () {
      notificationNode.classList.add('hidden');
      notificationCloseBtn.removeEventListener('click', onCloseNotification);
    };
    notificationCloseBtn.addEventListener('click', onCloseNotification);
  };
})();
