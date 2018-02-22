'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var fieldsForm = document.querySelectorAll('fieldset');
  var fieldAddress = document.querySelector('#address');

  var renderedPins = [];

  var disableFields = function (isDisable) {
    for (var i = 0; i < fieldsForm.length; i++) {
      fieldsForm[i].disabled = isDisable;
    }
  };

  window.pageState = {
    setActive: function () {
      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      disableFields(false);
    },
    setPassive: function () {
      mainPin.style = '';
      mainPin.style.transform = 'translate(0,0)';
      var mapCard = document.querySelector('.map__card');

      if (mapCard) {
        var pinOfCard = map.querySelector('.map__card + .map__pin');
        map.removeChild(pinOfCard);
        map.removeChild(mapCard);
      }

      renderedPins = mapPins.querySelectorAll('.map__pin');
      [].forEach.call(renderedPins, function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          mapPins.removeChild(pin);
        }
      });

      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');

      var pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
      var pinLocationY = mainPin.offsetTop + mainPin.offsetHeight / 2;
      fieldAddress.value = pinLocationX + ', ' + pinLocationY;

      disableFields(true);
    }
  };

  window.pageState.setPassive();

})();
