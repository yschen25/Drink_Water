'use strict';

// const log = chrome.extension.getBackgroundPage().console.log;

let sleepTime = -1;
let display = false;
let timer;
let timeId;
let fileName = "music/default.mp3";
let noteType = "both";

let opt = {
    type: 'basic',
    iconUrl: 'img/drink_water.png',
    title: 'Time to Drink Water',
    message: 'Stand up and take a sip!',
    requireInteraction: false
};

function run(minutes) {
    sleepTime = minutes * 60000;
    saveTime(minutes);
    reminder();
}

function start() {
    chrome.storage.sync.get(["time","soundName","noteType","keepNote"],function(obj){
        let name = obj.soundName;
        let type = obj.noteType;
        let keepNote = obj.keepNote;

        if(name !== undefined){
            fileName = name;
        }

        if(type !== undefined){
            noteType = type;
        }

        if(keepNote !== undefined && keepNote){
            display = true;
        }

        let time = obj.time;
        if(time !== undefined && time !== -1){
            sleepTime = time * 60000;
            reminder();
        }
    });
}

function reminder() {
    if (timer) {
        clearTimeout(timer);
    }

    let audio = new Audio(fileName);
    audio.play();

    opt.requireInteraction = display;

    if (timeId !== undefined) {
        chrome.notifications.clear(timeId);
    }

    chrome.notifications.create(opt, function (id) {
        timeId = id;
    });

    timer = setTimeout(reminder, sleepTime);
}

function stop() {

    if (timer) {
        clearTimeout(timer);
        saveTime(-1);
    }

    if (timeId !== undefined) {
        chrome.notifications.clear(timeId);
    }
}

function saveTime(time) {
    chrome.storage.sync.set({"time": time});
}

start();