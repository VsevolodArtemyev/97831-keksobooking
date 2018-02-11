'use strict';

(function () {

  var PHOTO_WIDTH = 100;

  // заполнение вспомогательных данных для карточки предложения
  var offerTypes = {
    bungalo: 'Бунгало',
    house: 'Дом',
    flat: 'Квартира'
  };

  var getOfferFeatures = function (offerItem) {
    var templateFeature = document.createElement('li');
    templateFeature.classList.add('feature');
    var offerFeaturesFragment = document.createDocumentFragment();

    for (var i = 0; i < offerItem.offer.features.length; i++) {
      var featureItem = templateFeature.cloneNode();
      featureItem.classList.add('feature--' + offerItem.offer.features[i]);
      offerFeaturesFragment.appendChild(featureItem);
    }

    return offerFeaturesFragment;
  };

  var getOfferPictures = function (offerItem) {
    var templatePicture = document.createElement('li');
    var offerPicturesFragment = document.createDocumentFragment();

    for (var i = 0; i < offerItem.offer.photos.length; i++) {
      var pictureItem = templatePicture.cloneNode();
      var imgInPicture = document.createElement('img');
      imgInPicture.src = offerItem.offer.photos[i];
      imgInPicture.width = PHOTO_WIDTH;
      pictureItem.appendChild(imgInPicture);
      offerPicturesFragment.appendChild(pictureItem);
    }

    return offerPicturesFragment;
  };

  var templateOfferCard = document.querySelector('template').content;

  // заполнение данными карточки товара
  window.renderOfferCard = function (offerItem) {
    var filledOffer = templateOfferCard.cloneNode(true);

    filledOffer.querySelector('h3').textContent = offerItem.offer.title;
    filledOffer.querySelector('p small').textContent = offerItem.offer.address;
    filledOffer.querySelector('.popup__price').textContent = offerItem.offer.price + ' \u20BD/ночь';
    filledOffer.querySelector('h4').textContent = offerTypes[offerItem.offer.type];
    filledOffer.querySelector('h4 + p').textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
    filledOffer.querySelector('h4 + p + p').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    filledOffer.querySelector('.popup__avatar').src = offerItem.author.avatar;
    filledOffer.querySelector('ul + p').textContent = offerItem.offer.description;

    var offerFeaturesContainer = filledOffer.querySelector('.popup__features');
    offerFeaturesContainer.textContent = '';
    offerFeaturesContainer.appendChild(getOfferFeatures(offerItem));

    var offerPictureContainer = filledOffer.querySelector('.popup__pictures');
    offerPictureContainer.textContent = '';
    offerPictureContainer.style = 'display: flex; flex-wrap: wrap; justify-content: space-between;';
    offerPictureContainer.appendChild(getOfferPictures(offerItem));

    return filledOffer;
  };
})();
