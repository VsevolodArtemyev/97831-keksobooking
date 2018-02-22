'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingQuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var housingFeaturesInputs = housingFeatures.querySelectorAll('input');

  var PriceValueToNumberMax = {
    'low': 10000,
    'middle': 50000,
    'high': 100000000
  };
  var PriceValueToNumberMin = {
    'low': 0,
    'middle': 10000,
    'high': 50000
  };

  var offers = [];
  var filteredOffers = [];

  var onFilterByHousingType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    } else {
      return housingType.value === pin.offer.type;
    }
  };

  var onFilterByHousingPrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    } else {
      return (pin.offer.price < PriceValueToNumberMax[housingPrice.value]) && (pin.offer.price >= PriceValueToNumberMin[housingPrice.value]);
    }
  };

  var onFilterByHousingRooms = function (pin) {
    if (housingRooms.value === 'any') {
      return true;
    } else {
      return +housingRooms.value === pin.offer.rooms;
    }
  };

  var onFilterByHousingQuests = function (pin) {
    if (housingQuests.value === 'any') {
      return true;
    } else {
      return +housingQuests.value === pin.offer.guests;
    }
  };

  var onFilterByHousingFeatures = function (pin) {
    var choisenFeatures = [].filter.call(housingFeaturesInputs, function (elem) {
      return elem.checked;
    });
    if (choisenFeatures.length === 0) {
      return true;
    } else {
      var existenceChosenFeatures = 0;
      [].forEach.call(choisenFeatures, function (choisenFeature) {
        pin.offer.features.forEach(function (offerFeature) {
          if (choisenFeature.value === offerFeature) {
            existenceChosenFeatures++;
          }
        });
      });
      return existenceChosenFeatures === choisenFeatures.length;
    }
  };

  var onChangeSelect = function () {
    offers = window.offers.slice();
    filteredOffers = offers.filter(onFilterByHousingType)
        .filter(onFilterByHousingPrice)
        .filter(onFilterByHousingRooms)
        .filter(onFilterByHousingQuests)
        .filter(onFilterByHousingFeatures);
    window.debounce(window.updatePins(filteredOffers));
  };

  housingType.addEventListener('change', onChangeSelect);
  housingPrice.addEventListener('change', onChangeSelect);
  housingRooms.addEventListener('change', onChangeSelect);
  housingQuests.addEventListener('change', onChangeSelect);
  housingFeatures.addEventListener('change', onChangeSelect);
})();
