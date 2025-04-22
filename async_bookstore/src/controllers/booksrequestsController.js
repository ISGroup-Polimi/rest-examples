const service = require('../services/booksrequestsService.js');

module.exports.requestBookList = function requestBookList(req, res) {
    service.requestBookList(req, res);
}

