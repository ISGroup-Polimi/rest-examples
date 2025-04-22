requests = require("./booksrequestsService.js").requests;

module.exports.getBookListStatus = function getBookListStatus(req, res) {
    const { requestId } = req.params;
    const record = requests[requestId];
  
    res.set('Content-Type', 'application/json');

    if (!record) {
      return res.status(404).send({ error: 'Request ID not found' });
    }
  
    if (record.status === 'pending') {
      return res.status(202).send({
        requestId,
        status: 'pending'
      });
    }
  
    res.send({
      requestId,
      status: 'completed',
      books: record.books
    });
}

