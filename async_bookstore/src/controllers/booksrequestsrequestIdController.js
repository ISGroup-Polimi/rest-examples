const service = require('../services/booksrequestsrequestIdService.js');

module.exports.getBookListStatus = function getBookListStatus(req, res) {
    service.getBookListStatus(req, res);
}

