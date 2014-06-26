var gcm = require('node-gcm');

// create a message with default values

var message = new gcm.Message({
    collapseKey: 'pushTest',
    delayWhileIdle: true,
    timeToLive: 3,
    data: {
        "message": "PhoneGap Build rocks!",
        "msgcnt": "1",
        "soundname": "beep.wav"
    }
});

var sender = new gcm.Sender('<< sender-key >>');
var registrationIds = [];


registrationIds.push("APA91bGGPylpmjHGY2fr-4ypJYh60fVq_HsCk2oafwDQbWv5XWL7FAgFc-HNVRx0GaugCuwE0-KkfoPXmTidEnRg-zrbFpRYJ3mcYYF7kfpEjSXu1IelgdO7Vu_oiqFkSSMmxaRIpx3rxPPHXALCWsvoU0M0ZGoauQ");



// Params: message-literal, registrationIds-array, No. of retries, callback-function

sender.send(message, registrationIds, 4, function(err, result) {
    console.log(result);
});