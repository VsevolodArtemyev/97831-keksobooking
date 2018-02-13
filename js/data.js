'use strict';

(function () {

  window.QUANTITY_OFFER = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  window.pinCoordinate = {
    MIN_COORDINATE_X: 300,
    MAX_COORDINATE_X: 900,
    MIN_COORDINATE_Y: 150,
    MAX_COORDINATE_Y: 500
  };
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  // сортировка массива случайным образом
  var compareValues = function () {
    return Math.random() - 0.5;
  };

  var renderOffer = function () {
    var offers = [];

    // создание массива аватаров
    var imgUrls = [];
    for (var i = 1; i <= window.QUANTITY_OFFER; i++) {
      imgUrls.push('img/avatars/user0' + i + '.png');
    }

    // копируем массив фотографий
    var offersPhotos = OFFER_PHOTOS.slice();

    // создание объекта предложения
    for (i = 0; i < window.QUANTITY_OFFER; i++) {
      var offerImgNumber = Math.floor(Math.random() * imgUrls.length);
      var offerTitleNumber = Math.floor(Math.random() * OFFER_TITLES.length);
      offersPhotos.sort(compareValues);
      // формируем массив случайной длины
      var offersFeatures = OFFER_FEATURES.slice();
      offersFeatures.length = Math.floor(Math.random() * (offersFeatures.length - 1) + 1);
      // определение координат случайным образом в заданном диапазоне
      var offerLocationX = Math.floor(Math.random() * (window.pinCoordinate.MAX_COORDINATE_X - window.pinCoordinate.MIN_COORDINATE_X) + window.pinCoordinate.MIN_COORDINATE_X);
      var offerLocationY = Math.floor(Math.random() * (window.pinCoordinate.MAX_COORDINATE_Y - window.pinCoordinate.MIN_COORDINATE_Y) + window.pinCoordinate.MIN_COORDINATE_Y);

      offers.push({
        id: i,
        author: {
          avatar: imgUrls[offerImgNumber]
        },
        offer: {
          title: OFFER_TITLES[offerTitleNumber],
          address: offerLocationX + ', ' + offerLocationY,
          price: Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE),
          type: OFFER_TYPES[Math.floor(Math.random() * OFFER_TYPES.length)],
          rooms: Math.floor(Math.random() * (5 - 1) + 1),
          guests: Math.floor(Math.random() * (10 - 1) + 1),
          checkin: OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
          checkout: OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
          features: offersFeatures,
          description: '',
          photos: offersPhotos
        },
        location: {
          x: offerLocationX,
          y: offerLocationY
        }
      });

      // удаление из массивов картинок и названий использованных элементов
      imgUrls.splice(offerImgNumber, 1);
      OFFER_TITLES.splice(offerTitleNumber, 1);
    }
    return offers;
  };

  // генерируем массив предложений
  window.offers = renderOffer();
})();
