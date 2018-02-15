'use strict';

(function () {
  var NOT_GUEST_ROOMS_VALUE = 100;
  var NOT_GUEST_CAPACITY_VALUE = 0;

  var form = document.querySelector('.notice__form');

  var fieldPrice = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var optionsCapacitySelect = document.querySelectorAll('#capacity option');

  var offerMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  fieldPrice.min = offerMinPrice[typeSelect.value];

  typeSelect.addEventListener('change', function (evt) {
    fieldPrice.min = offerMinPrice[evt.target.value];
  });

  fieldTimeIn.addEventListener('change', function (evt) {
    fieldTimeOut.value = evt.target.value;
  });

  fieldTimeOut.addEventListener('change', function (evt) {
    fieldTimeIn.value = evt.target.value;
  });

  var selectedRoomValue = roomsSelect.value;

  var disableCapacityOptions = function (selectedRoom) {
    for (var i = 0; i < optionsCapacitySelect.length; i++) {
      if (selectedRoom === NOT_GUEST_ROOMS_VALUE) {
        capacitySelect.value = NOT_GUEST_CAPACITY_VALUE;
        optionsCapacitySelect[i].disabled = true;
        if (+optionsCapacitySelect[i].value === NOT_GUEST_CAPACITY_VALUE) {
          optionsCapacitySelect[i].disabled = false;
        }
      } else {
        optionsCapacitySelect[i].disabled = false;
        if (+optionsCapacitySelect[i].value === NOT_GUEST_CAPACITY_VALUE) {
          optionsCapacitySelect[i].disabled = true;
        }
        if (+optionsCapacitySelect[i].value > selectedRoom) {
          optionsCapacitySelect[i].disabled = true;
        }
        if (capacitySelect.value > selectedRoom || +capacitySelect.value === NOT_GUEST_CAPACITY_VALUE) {
          capacitySelect.value = selectedRoom;
        }
      }
    }
  };

  disableCapacityOptions(+selectedRoomValue);

  roomsSelect.addEventListener('change', function (evt) {
    selectedRoomValue = evt.target.value;
    disableCapacityOptions(+selectedRoomValue);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), form.reset.bind(form), window.showErrorMessage);
    evt.preventDefault();
  });

})();
