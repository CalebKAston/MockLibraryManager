import { books } from '../../data/books';

export default (req, res) => {
  if (req.method === 'GET' || true) {
    res.statusCode = 200;
    return res.json(books.find((book) => book.id === parseInt(req.query.id)));
  }
  if (req.method === 'POST') {
  }
  if (req.method === 'PUT') {
  }
  if (req.method === 'DELETE') {
  }
};
