import { books } from '../../data/books';

export default (req, res) => {
  res.statusCode = 200;
  res.json(books);
};
