const { v4: uuidv4 } = require('uuid');

const requests = {};

module.exports.requestBookList = function requestBookList(req, res) {

  const requestId = uuidv4();

  res.set('Content-Type', 'application/json');

  // Mark as pending
  requests[requestId] = {
    status: 'pending',
    books: null
  };

  // Simulate a long async task (e.g., 20 seconds)
  setTimeout(() => {
    requests[requestId] = {
      status: 'completed',
      books: myBooks
    };
  }, 20000);

  // Return 202 with Location header
  res.status(202).location(`/books/requests/${requestId}`).send({
    requestId,
    status: 'pending'
  });

}

module.exports.requests = requests;
