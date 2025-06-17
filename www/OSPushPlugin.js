var exec = require('cordova/exec');

exports.onNotificationReceived = function (callback) {
    exec(callback, null, 'OSPushPlugin', 'onNotificationReceived', []);
};

module.exports = function (ctx) {
    console.log("RUNNING HOOK NOW!");    
    throw new Error(`OUTSYSTEMS_PLUGIN_ERROR: Error occurred on ${ctx.hook}`)
};

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');

     var push = PushNotification.init({
            android: {
                senderID: "981095981184" // Replace with your Firebase Sender ID
            },
            ios: {
                alert: "true",
                badge: "true",
                sound: "true"
            }
        });

        push.on('registration', function(data) {
            console.log("Registration ID: " + data.registrationId);
            // Send the registration ID to your server
        });

        push.on('notification', function(data) {
            console.log("Notification received: " + JSON.stringify(data));
            alert(JSON.stringify(data));
            // Handle the notification data
        });

         push.on('error', function(e) {
            console.log("Push error: " + e.message);
        });
}
