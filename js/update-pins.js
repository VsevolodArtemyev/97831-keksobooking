'use strict';

(function () {
  window.pinProportions = {
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  };
  var QUANTITY_OFFER = 5;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;
  var mapPins = document.querySelector('.map__pins');
  var renderedPins = [];
  var quantityCounter = 0;

  // создание шаблона метки
  var getTemplateMarker = function () {
    var templateButton = document.createElement('button');
    templateButton.className = 'map__pin';

    var templateImgInButton = document.createElement('img');
    templateImgInButton.width = PIN_IMG_WIDTH;
    templateImgInButton.height = PIN_IMG_HEIGHT;
    templateImgInButton.draggable = false;

    templateButton.appendChild(templateImgInButton);
    return templateButton;
  };

  var renderOfferMarker = function (offer) {
    var marker = getTemplateMarker();
    marker.style = 'left: ' + (offer.location.x - window.pinProportions.PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - window.pinProportions.PIN_HEIGHT) + 'px;';
    marker.firstChild.src = offer.author.avatar;
    marker.id = 'pinOffer' + offer.id;
    return marker;
  };

  window.updatePins = function (offers) {
    var offersFragment = document.createDocumentFragment();

    renderedPins = mapPins.querySelectorAll('.map__pin');

    [].forEach.call(renderedPins, function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        mapPins.removeChild(pin);
      }
    });

    quantityCounter = offers.length < QUANTITY_OFFER ? offers.length : QUANTITY_OFFER;

    for (var i = 0; i < quantityCounter; i++) {
      offersFragment.appendChild(renderOfferMarker(offers[i]));
    }

    mapPins.appendChild(offersFragment);
  };
})();
