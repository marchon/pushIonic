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

var sender = new gcm.Sender('<<sender-key>>');
var registrationIds = [];


registrationIds.push("regId");



// Params: message-literal, registrationIds-array, No. of retries, callback-function

sender.send(message, registrationIds, 4, function(err, result) {
    console.log(result);
});