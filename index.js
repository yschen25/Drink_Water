'use strict';

const log = chrome.extension.getBackgroundPage().console.log;
const background = chrome.extension.getBackgroundPage();

function setAlarm(event) {
    let minutes = parseFloat(event.target.getAttribute('data-time'));
    window.close();
    background.run(minutes);
}

function clearAlarm() {
    window.close();
    background.stop();
}

window.onload = function () {
    let items = document.getElementsByClassName('btn');
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', setAlarm);
    }
    document.getElementById('cancel').addEventListener('click', clearAlarm);
};