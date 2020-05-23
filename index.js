'use strict';

const log = chrome.extension.getBackgroundPage().console.log;

function setAlarm(event) {
  let minutes = parseFloat(event.target.getAttribute('data-time'));
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

let items = document.getElementsByClassName('btn');
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', setAlarm);
}
document.getElementById('cancel').addEventListener('click', clearAlarm);

// Sound
// Input
// Store