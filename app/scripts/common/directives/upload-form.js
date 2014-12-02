'use strict';

angular.module('tigerwitApp')
.directive('wdUploadForm', ['$window', 'wdConfig', '$timeout',
function($window, wdConfig, $timeout) {
return {
    restrict: 'A',
    scope: false,
    replace: false,
    controller: ['$scope',
    function($scope) {
    }],
    link: function($scope, $element, $attrs, $controller) {
        // 初始化Web Uploader
        var uploader = $window.WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // compress
            compress: false,

            // swf文件路径
             swf: '/base/webuploader-0.1.5/Uploader.swf',

            // 文件接收服务端。
            server: wdConfig.apiUrl + '/upload',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: $element[0],

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,png',
                mimeTypes: 'image/*'
            },
            formData: {
                face: $attrs.face
            }
        });

        uploader.on('startUpload', function() {
            $scope.$emit('wd-upload-form-start', {
                face: $attrs.face
            });
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        uploader.on('uploadSuccess', function(data, response) {
            var imagePath = response.path;
            if ($('.image-uploaded', $element).length === 1) {
                $('.image-uploaded', $element).remove();
            }
            $element.append('<img class="image-uploaded" src="' + imagePath + '?timestamp=' + (+new Date())+ '" />')
            $scope.$emit('wd-upload-form-success', {
                face: $attrs.face
            });
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function(error) {
            $scope.$emit('wd-upload-form-error', {
                face: $attrs.face
            });
        });

        // 文件上传失败，显示上传出错。
        uploader.on('error', function(error) {
            $timeout(function () {
                $scope.$emit('wd-upload-form-type-error', {
                    face: $attrs.face
                });
            }, 300);
        });

    }
};
}]);
