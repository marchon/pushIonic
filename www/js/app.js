angular.module('pushzilla', ['ionic', '$push'])
    .config(['$pushProvider',
        function($pushProvider) {
            $pushProvider.setPushParams({
                "senderID": "<< senderID >> " // For android
            });
        }
    ])
    .run(['$push',
        function($push) {
            $push.init();
        }
    ])
    .controller('MainCtrl', ['$rootScope', '$scope',
        function($rootScope, $scope) {
            $scope.data = []
            $scope.platform = ionic.Platform.platform()
            $rootScope.$on('push:notification:android', function(event, e) {
                switch (e.event) {
                    case "registered":
                        if (e.regid) {
                            $scope.regid = e.regid;
                            $scope.$apply()
                            console.log($scope.regid);
                        }
                        break;
                    case "message":
                        if (e.foreground) {
                            var soundfile = e.soundname || e.payload.sound;
                            if (soundfile) {
                                var my_media = new Media("/android_asset/www/" + soundfile);
                                my_media.play();
                            }
                        } else if (e.coldstart) {
                            // Cold start
                        }
                        $scope.notification = e;
                        $scope.$apply();
                }
            });
            $rootScope.$on('push:token:android', function(event, data) {
                $scope.success = true;
                $scope.$apply()
            });
            $rootScope.$on('push:notification:ios', function(event, data) {
                $scope.notification = data;
                $scope.$apply()
            });
            $rootScope.$on('push:token:ios', function(event, data) {
                $scope.success = true;
                $scope.$apply()
            });
            $rootScope.$on('push:token:error', function(event, data) {
                $scope.success = false;
                $scope.notification = data;
                $scope.$apply()
            });

        }
    ]);