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
  var mapPinsOverlay = document.querySelector('.map__pinsoverlay');

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.style.transform = 'translate(0,0)';

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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };

      var pinX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
      var pinY = mainPin.offsetTop + PIN_HEIGHT;

      var nextPinCoordinateX = pinX - shift.x;
      var nextPinCoordinateY = pinY - shift.y;

      var isAvailableY = nextPinCoordinateY >= window.pinCoordinate.MIN_COORDINATE_Y && nextPinCoordinateY <= window.pinCoordinate.MAX_COORDINATE_Y;
      var isAvailableX = nextPinCoordinateX >= mainPin.offsetWidth / 2 && nextPinCoordinateX <= mapPinsOverlay.offsetWidth - mainPin.offsetWidth / 2;

      if (isAvailableY || isAvailableX) {
        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };
        if (isAvailableY) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }
        if (isAvailableX) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        getActivePage();
        renderPins();
      }
      getPinLocation();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
