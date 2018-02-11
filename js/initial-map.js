'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_IMG_WIDTH = 40;
  var PIN_IMG_HEIGHT = 40;
  var PIN_HEIGHT = 70;

  window.mapPins = document.querySelector('.map__pins');

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var fieldsForm = document.querySelectorAll('fieldset');

  var mainPin = document.querySelector('.map__pin--main');

  var pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
  var pinLocationY = mainPin.offsetTop + mainPin.offsetHeight / 2;

  var fieldAddress = document.querySelector('#address');

  fieldAddress.value = pinLocationX + ', ' + pinLocationY;

  for (var i = 0; i < fieldsForm.length; i++) {
    fieldsForm[i].disabled = true;
  }

  var getActivePage = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    for (i = 0; i < fieldsForm.length; i++) {
      fieldsForm[i].disabled = false;
    }
  };

  var getPinLocation = function () {
    pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
    pinLocationY = mainPin.offsetTop + PIN_HEIGHT;
    fieldAddress.value = pinLocationX + ', ' + pinLocationY;
  };

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

  // функция добавления параметров метки
  var renderOfferMarker = function (offer) {
    var marker = getTemplateMarker();
    marker.style = 'left: ' + (offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
    marker.firstChild.src = offer.author.avatar;
    marker.id = 'pinOffer' + offer.id;
    return marker;
  };

  // формирование фрагмента со всеми метками
  var renderPins = function () {
    var offersFragment = document.createDocumentFragment();
    for (i = 0; i < window.QUANTITY_OFFER; i++) {
      offersFragment.appendChild(renderOfferMarker(window.offers[i]));
    }
    window.mapPins.appendChild(offersFragment);
  };

  mainPin.addEventListener('mouseup', function () {
    getActivePage();
    getPinLocation();
    renderPins();
  });
})();
