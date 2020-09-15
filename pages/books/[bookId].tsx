import { useRouter } from 'next/router';
import { Book as ApiBook } from '../../data/books';
import { useState, useEffect } from 'react';

const Book = () => {
  const router = useRouter();
  const { bookId } = router.query;

  console.log(bookId);

  const [book, setBook] = useState<ApiBook>();

  useEffect(() => {
    if (bookId)
      fetch(`http://localhost:3000/api/book?id=${bookId}`)
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((book) => {
          console.log(book);
          setBook(book);
        })
        .catch(console.error);
  }, [bookId]);

  return <p>Book: {JSON.stringify(book)}</p>;
};

export default Book;
