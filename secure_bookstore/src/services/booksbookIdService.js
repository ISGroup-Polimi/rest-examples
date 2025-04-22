

module.exports.getBookById = function getBookById(req, res) {
    
    var result = myBooks.find(o => o.id === JSON.parse(req.params.bookId));

    res.set('Content-Type', 'application/json');
    
    if (result === undefined) {
        res.status(404).send({"message": "Book not found"});    
    } else {
        res.status(200).send(result);
    }
}

module.exports.updateBook = function updateBook(req, res) {

    var result = myBooks.find(o => o.id === JSON.parse(req.params.bookId));

    res.set('Content-Type', 'application/json');

    if (result === undefined) {
        res.status(404).send({"message": "Book not found"});    
    } else {
        myBooks = myBooks.filter(o => o.id != JSON.parse(req.params.bookId))
        var newbook = {};
        newbook.id = JSON.parse(req.params.bookId)
        newbook = Object.assign(newbook, req.body);
        myBooks.push(newbook);
        res.status(200).send(newbook);
    }
}

module.exports.deleteBook = function deleteBook(req, res) {
    var result = myBooks.find(o => o.id === JSON.parse(req.params.bookId));

    res.set('Content-Type', 'application/json');

    if (result === undefined) {
        res.status(404).send({"message": "Book not found"});    
    } else {
        myBooks = myBooks.filter(o => o.id != JSON.parse(req.params.bookId))
        
        res.status(204).send({});
    }
}

