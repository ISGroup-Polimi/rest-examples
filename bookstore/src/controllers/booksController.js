const service = require('../services/booksService.js');

module.exports.listBooks = function listBooks(req, res) {
    service.listBooks(req, res);
}

module.exports.addBook = function addBook(req, res) {
    service.addBook(req, res);
}

