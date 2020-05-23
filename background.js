'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'img/drink_water.png',
      title:    'Time to Drink Water',
      message:  'Stand up and take a sip!',
      priority: 0});
});
