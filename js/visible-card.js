'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var mapPins = document.querySelector('.map__pins');

  mapPins.addEventListener('click', function (evt) {
    var offerId = evt.path[1].id.substr(-1);
    if (offerId) {
      showCardPopup(offerId);
    }
  });
  mapPins.addEventListener('keydown', function (evt) {
    var offerId = evt.target.id.substr(-1);
    if (offerId && evt.keyCode === ENTER_KEYCODE) {
      showCardPopup(offerId);
    }
  });

  var onPressCloseCard = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideCardPopup();
    }
  };

  var hideCardPopup = function () {
    document.querySelector('.map').removeChild(document.querySelector('.map>.map__card'));
    document.querySelector('.map').removeChild(document.querySelector('.map>.map__pin'));
    document.removeEventListener('keydown', onPressCloseCard);
  };


  // добавление карточки предложения
  var showCardPopup = function (numberOfOffer) {
    var offerCardsFragment = document.createDocumentFragment();
    offerCardsFragment.appendChild(window.renderOfferCard(window.offers[numberOfOffer]));
    if (document.querySelector('.map>.map__card')) {
      hideCardPopup();
    }
    document.querySelector('.map').insertBefore(offerCardsFragment, document.querySelector('.map__filters-container'));

    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function () {
      hideCardPopup();
    });
    document.addEventListener('keydown', onPressCloseCard);
  };
})();

