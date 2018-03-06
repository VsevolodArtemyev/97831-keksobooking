'use strict';

(function () {
  var OFFERS_COUNT = 8;
  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = ['flat', 'house', 'bungalo'];
  var TIMES = ['12.00', '13.00', '14.00'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TYPES_TRANSLATIONS = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом'
  };

  var offerCardTemplateElement = document.querySelector('template').content.querySelector('.map__card');
  var filtersContainerElement = document.querySelector('.map__filters-container');
  var mapPinsElement = document.querySelector('.map__pins');
  var mapElement = document.querySelector('.map');

  var adverts = generateOffers();

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  function shufflePhotos(originPhotos) {
    var photos = originPhotos.slice();

    return photos.sort(function () {
      return Math.random() < 0.5 ? 1 : -1;
    });
  }

  function generateOffers() {
    var data = [];

    for (var i = 0; i < OFFERS_COUNT; i++) {
      var location = {
        x: getRandom(300, 900),
        y: getRandom(300, 900)
      };

      data.push({
        author: {
          avatar: 'img/avatars/user0' + i
        },
        offer: {
          title: TITLES[i],
          address: location.x + ', ' + location.y,
          price: getRandom(1000, 1000000),
          type: TYPES[getRandom(0, 2)],
          rooms: getRandom(1, 5),
          guests: getRandom(1, 100),
          checkout: TIMES[getRandom(0, 2)],
          checkin: TIMES[getRandom(0, 2)],
          features: FEATURES.slice(0, getRandom(1, FEATURES.length)),
          description: '',
          photos: shufflePhotos(PHOTOS)
        },
        location: location
      });
    }

    return data;
  }

  function createPinLayout(advert) {
    var button = document.createElement('button');

    button.style.left = advert.location + PIN_WIDTH / 2;
    button.style.top = advert.location + PIN_HEIGHT;

    button.className = 'map__pin';
    button.innerHTML = '<img src="' + advert.author.avatar + '" width="40" height="40" draggable="false">';

    return button;
  }

  function renderPins(offers) {
    var pinsFragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      pinsFragment.appendChild((createPinLayout(offer)));
    });

    mapPinsElement.appendChild(pinsFragment);
  }

  function renderOfferCard(advert) {
    var offer = advert.offer;
    var offerCardElement = offerCardTemplateElement.cloneNode();

    offerCardElement.querySelector('.popup__title').textContent = offer.title;
    offerCardElement.querySelector('.popup__address small').textContent = offer.address;
    offerCardElement.querySelector('.popup__price').textContent = offer.price + '&#x20bd;/ночь';
    offerCardElement.querySelector('.popup__type').textContent = TYPES_TRANSLATIONS[offer.type];
    offerCardElement.querySelector('.popup__rooms').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    offerCardElement.querySelector('.popup__checking').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    offerCardElement.querySelector('.popup__description').textContent = offer.description;

    offerCardElement.querySelector('.popup__features').innerHTML = offer.features
        .map(function (feature) {
          return '<li class="feature feature--' + feature + '"></li>';
        })
        .join('');

    offerCardElement.querySelector('.popup__pictures').innerHTML = offer.photos
        .map(function (photoUrl) {
          return '<li><img src="' + photoUrl + '"></li>';
        })
        .join('');

    mapElement.insertBefore(offerCardElement, filtersContainerElement);
  }

  mapElement.classList.remove('map--faded');

  renderPins(adverts);
  renderOfferCard(adverts[0]);
})();
