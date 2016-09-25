(function() {
    'use strict';
    angular.module('gdsApp')
        .service('DownloaderService', DownloaderService);
    DownloaderService.$inject = ['API_HOST', 'FILE_CONTEXT', 'DOWNLOAD_LINK', 'READ_LINK'];

    function DownloaderService(API_HOST, FILE_CONTEXT, DOWNLOAD_LINK, READ_LINK) {
        return {
            createDownloadLink: createDownloadLink,
            createRawFileLink: createRawFileLink
        };

        function createDownloadLink(fileId) {
            return API_HOST + FILE_CONTEXT + DOWNLOAD_LINK + fileId;
        }

        function createRawFileLink(fileId) {
            return API_HOST + FILE_CONTEXT + READ_LINK + fileId;
        }
    }
})();