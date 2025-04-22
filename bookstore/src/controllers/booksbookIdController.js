const service = require('../services/booksbookIdService.js');

module.exports.getBookById = function getBookById(req, res) {
    service.getBookById(req, res);
}

module.exports.updateBook = function updateBook(req, res) {
    service.updateBook(req, res);
}

module.exports.deleteBook = function deleteBook(req, res) {
    service.deleteBook(req, res);
}

