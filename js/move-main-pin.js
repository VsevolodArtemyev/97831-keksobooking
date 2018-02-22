'use strict';

(function () {

  var MIN_COORDINATE_Y = 150;
  var MAX_COORDINATE_Y = 500;
  var mapPinsOverlay = document.querySelector('.map__pinsoverlay');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var fieldAddress = document.querySelector('#address');

  var pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
  var pinLocationY = mainPin.offsetTop + mainPin.offsetHeight / 2;

  var getPinLocation = function () {
    pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
    pinLocationY = mainPin.offsetTop + window.pinProportions.PIN_HEIGHT;
    fieldAddress.value = pinLocationX + ', ' + pinLocationY;
  };

  var getSuccessResponse = function (offers) {
    window.offers = offers;
    window.offers.forEach(function (item, index) {
      item.id = index;
    });
    window.updatePins(window.offers);
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
      var pinY = mainPin.offsetTop + window.pinProportions.PIN_HEIGHT;

      var nextPinCoordinateX = pinX - shift.x;
      var nextPinCoordinateY = pinY - shift.y;

      var isAvailableY = nextPinCoordinateY >= MIN_COORDINATE_Y && nextPinCoordinateY <= MAX_COORDINATE_Y;
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
        window.pageState.setActive();
        window.backend.load(getSuccessResponse, window.showErrorMessage);
      }
      getPinLocation();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
