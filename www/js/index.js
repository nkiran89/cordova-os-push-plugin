/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
 document.addEventListener('deviceready', onDeviceReady, false);

async function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    var BackgroundFetch = window.BackgroundFetch;

    // Your BackgroundFetch event handler.
    var onEvent = async function(taskId) {
        console.log('[BackgroundFetch] event received: ', taskId);
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time

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
        
        BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    var onTimeout = async function(taskId) {
        console.log('[BackgroundFetch] TIMEOUT: ', taskId);
        BackgroundFetch.finish(taskId);
    };

    var status = await BackgroundFetch.configure({
        minimumFetchInterval: 15,
        stopOnTerminate : false
    }, onEvent, onTimeout);

    console.log('[BackgroundFetch] configure status: ', status);

    //document.getElementById('deviceready').classList.add('ready');

     
}

// 














