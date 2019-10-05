'use strict';

(function () {
  window.marker = {
    MARK_WIDTH: 62,
    MARK_HEIGHT: 84,
    mark: document.querySelector('.map__pin--main'),
    MIN_X: 0,
    maxX: document.querySelector('.map__overlay').offsetWidth,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  window.marker.mark.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var markShiftCoords = {
        x: window.marker.mark.offsetLeft - shift.x,
        y: window.marker.mark.offsetTop - shift.y
      };

      var getMoveLimits = function () {
        if (markShiftCoords.x < window.marker.MIN_X - window.marker.MARK_WIDTH / 2) {
          markShiftCoords.x = window.marker.MIN_X - window.marker.MARK_WIDTH / 2;
        }

        if (markShiftCoords.x > window.marker.maxX - window.marker.MARK_WIDTH / 2) {
          markShiftCoords.x = window.marker.maxX - window.marker.MARK_WIDTH / 2;
        }

        if (markShiftCoords.y < window.marker.MIN_Y - window.marker.MARK_HEIGHT) {
          markShiftCoords.y = window.marker.MIN_Y - window.marker.MARK_HEIGHT;
        }

        if (markShiftCoords.y > window.marker.MAX_Y - window.marker.MARK_HEIGHT) {
          markShiftCoords.y = window.marker.MAX_Y - window.marker.MARK_HEIGHT;
        }
      };

      getMoveLimits();

      window.marker.mark.style.left = markShiftCoords.x + 'px';
      window.marker.mark.style.top = markShiftCoords.y + 'px';

      window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_HEIGHT);

      if (dragged) {
        var onClickPreventDefault = function (removeEvt) {
          removeEvt.preventDefault();
          window.marker.mark.removeEventListener('click', onClickPreventDefault);
        };
        window.marker.mark.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
