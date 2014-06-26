'use strict';
(function(pushModule) {

    pushModule.provider("$push", function() {
        var pushParams = {};
        return {
            $get: ['$rootScope', '$window',
                function($rootScope, $window) {
                    var pushNotification = $window.plugins ? $window.plugins.pushNotification : null;

                    if (!pushNotification || !ionic.Platform.isWebView()) return;
                    var $PUSH = {

                        onNotificationIOS: function(e) {

                            var injector = angular.element(document.body).injector();
                            injector.invoke(['$rootScope',
                                function($rootScope) {
                                    if (e.badge) {
                                        pushNotification.setApplicationIconBadgeNumber(function(data) {
                                            $rootScope.$broadcast("push:success:ios", data);
                                        }, e);
                                    }
                                    if (e.sound) {
                                        var snd = new Media(e.sound);
                                        snd.play();
                                    }
                                    if (e.alert) {
                                        navigator.notification.alert(e.alert);
                                    }
                                    $rootScope.$broadcast("push:notification:ios", e);
                                }
                            ]);

                        },
                        onNotificationAndroid: function(e) {
                            var injector = angular.element(document.body).injector();
                            injector.invoke(['$rootScope',
                                function($rootScope) {
                                    $rootScope.$broadcast("push:notification:android", e);
                                }
                            ]);
                        }

                    };

                    $window.$PUSH = $PUSH;

                    var iosHandler = function(result) {
                        $rootScope.$broadcast("push:token:ios", result);
                    };
                    var androidHandler = function(result) {
                        console.log("android handler" + JSON.stringify(result))
                        $rootScope.$broadcast("push:token:android", result);
                    };

                    var errorHandler = function(error) {
                        console.log("error handler" + JSON.stringify(error))
                        $rootScope.$broadcast("push:token:error", error);
                    };
                    return {
                        init: function() {
                            console.log("Init called")
                            ionic.Platform.ready(function() {
                                switch (ionic.Platform.platform()) {
                                    case "android":
                                        pushNotification.register(androidHandler, errorHandler, pushParams);
                                        break;
                                    case "ios":
                                        pushNotification.register(iosHandler, errorHandler, pushParams);
                                        break
                                    default:
                                        break;

                                }
                            })
                        }
                    }

                }
            ],
            setPushParams: function(options) {

                switch (ionic.Platform.platform()) {
                    case "android":
                        pushParams = {
                            "ecb": "$PUSH.onNotificationAndroid"
                        }
                        break;
                    case "ios":
                        pushParams = {
                            "badge": "true",
                            "sound": "true",
                            "alert": "true",
                            "ecb": "$PUSH.onNotificationIOS"
                        }
                        break;
                    default:
                        break;
                }

                angular.extend(pushParams, options);
                console.log(JSON.stringify(pushParams))
            }
        }

    });
})(angular.module('$push', ['ionic']));