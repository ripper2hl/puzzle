
'use strict';

const OFFSET_TOP = 50; // Header height

const UI = (function() {
  navigator.mozL10n.ready(function localize() {
    document.documentElement.lang = navigator.mozL10n.language.code;
    document.documentElement.dir = navigator.mozL10n.language.direction;
  });

  var settingsView = document.querySelector('#settings-view');
  var gameView = document.querySelector('#game-view');

  var settingsOpen = document.querySelector('#settings-open');
  settingsOpen.addEventListener('click', function(e) {
    settingsView.dataset.pagePosition = 'viewport';
  });

  var settingsClose = document.querySelector('#settings-close');
  settingsClose.addEventListener('click', function(e) {
    settingsView.dataset.pagePosition = 'bottom';
  });

  var gameClose = document.querySelector('#game-close');
  gameClose.addEventListener('click', function closeGameView() {
    Game.end();
    gameView.dataset.pagePosition = 'right';
  });

  var playButton = document.querySelector('#play-button');
  playButton.addEventListener('click', function(e) {
    var activity = new MozActivity({
      name: 'pick',
      data: {
        type: 'image/jpeg',
        width: window.innerWidth - (2 * Game.rows),
        height: window.innerHeight - OFFSET_TOP - (2 * Game.rows)
      }
    });

    activity.onsuccess = function success() {
      Game.start(URL.createObjectURL(this.result.blob), function done() {
        gameView.dataset.pagePosition = 'viewport';
      });
    };

    activity.onerror = function() {
      window.console.error('Error picking a picture: ', activity.error);
    };
  });

  var levelSelect = document.querySelector('#level-select');
  var levelSpan = document.querySelector('#level-button > span');
  levelSelect.addEventListener('change', function onChange(e) {
    levelSpan.textContent = levelSelect.querySelector('option[value="' +
                                          levelSelect.value + '"]').textContent;
  });
}());