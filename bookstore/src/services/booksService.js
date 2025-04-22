

module.exports.listBooks = function listBooks(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).send(myBooks);
}

module.exports.addBook = function addBook(req, res) {

    //generate a random unique id
    var exist = true;
    var newid = 0;
    do {
        newid = Math.floor(Math.random() * 99999);
        exist = myBooks.find(o => o.id === newid) != undefined;

    } while (exist == true)

    var newbook = {};
    newbook.id = newid;
    newbook = Object.assign(newbook, req.body);

    myBooks.push(newbook);
    res.set('Content-Type', 'application/json');
    res.status(201).send(newbook);
}

