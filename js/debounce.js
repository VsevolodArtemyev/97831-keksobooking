'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeOut = 0;

  window.debounce = function (fun) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
