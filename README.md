pushIonic - Sample ionic project exposing a pushservice using cordova pushPlugin.

# Install the necessary plugins
```
cordova plugin add https://github.com/phonegap-build/PushPlugin.git
cordova plugin add org.apache.cordova.device
cordova plugin add org.apache.cordova.media
```

# Copy angular-push module

 www/js/angular-push.js

# Sample 

```
angular.module('pushIonic', ['ionic', 'push'])
    .config(['$pushProvider',
        function($pushProvider) {
            $pushProvider.setPushParams({ 
                "sender-id": "<< sender-id >>"
            });
        }
    ])
    .controller('MainCtrl', ['$rootScope',
        function($rootScope) {
            $rootScope.$on('push:notification:android', function(event, data) {

            });
            $rootScope.$on('push:token:android', function(event, data) {

            });
            $rootScope.$on('push:notification:ios', function(event, data) {

            });
            $rootScope.$on('push:token:ios', function(event, data) {

            });

        }
    ]);
```


# Send a push notification from the server
 Replace the sender key in push.js
```
npm install
node push.js

```
