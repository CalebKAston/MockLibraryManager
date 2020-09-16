import { useRouter } from 'next/router';
import { Book as ApiBook } from '../../data/books';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../components/modal';

const Book = () => {
  const router = useRouter();
  const { bookId } = router.query;

  const [book, setBook] = useState<ApiBook>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPages, setNewPages] = useState<number>();
  const [newIsCheckedOut, setNewIsCheckedOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (bookId) {
      setIsLoading(true);
      fetch(`http://localhost:3000/api/book?id=${bookId}`)
        .then((response) =>
          response.ok ? response.json() : Promise.reject(response)
        )
        .then((book: ApiBook) => {
          setBook(book);
          setNewTitle(book.title);
          setNewPages(book.pages);
          setNewIsCheckedOut(book.isCheckedOut);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [bookId]);

  const updateBook = () => {
    fetch(`http://localhost:3000/api/book`, {
      method: 'PUT',
      body: JSON.stringify({
        id: book.id,
        title: newTitle,
        pages: newPages,
        isCheckedOut: newIsCheckedOut,
      }),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((successResponse) => {
        setIsEditMode(false);
        setIsLoading(true);
        fetch(`http://localhost:3000/api/book?id=${bookId}`)
          .then((response) =>
            response.ok ? response.json() : Promise.reject(response)
          )
          .then((book: ApiBook) => {
            setBook(book);
            setNewTitle(book.title);
            setNewPages(book.pages);
            setNewIsCheckedOut(book.isCheckedOut);
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
      })
      .catch(console.error);
  };

  const deleteBook = () => {
    fetch(`http://localhost:3000/api/book`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: book.id,
      }),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((successResponse) => router.push('/'))
      .catch(console.error);
  };

  return (
    <AppWrapper>
      <Main>
        {isLoading || !book ? (
          <Title>Loading...</Title>
        ) : (
          <>
            <button onClick={() => router.push('/')}>{'<'} Back</button>
            <Title>{book.title}</Title>
            <UnstyledList>
              <li>
                Title:{' '}
                {isEditMode ? (
                  <input
                    type='text'
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                ) : (
                  book.title
                )}
              </li>
              <li>
                Pages:{' '}
                {isEditMode ? (
                  <input
                    type='number'
                    value={newPages}
                    onChange={(e) => setNewPages(parseInt(e.target.value))}
                  />
                ) : (
                  book.pages
                )}
              </li>
              <li>
                Is Checked Out:{' '}
                {isEditMode ? (
                  <input
                    type='checkbox'
                    checked={newIsCheckedOut}
                    onChange={(e) => setNewIsCheckedOut(e.target.checked)}
                  />
                ) : book.isCheckedOut ? (
                  'Yes'
                ) : (
                  'No'
                )}
              </li>
            </UnstyledList>
            {isEditMode ? (
              <ButtonContainer>
                <CancelButton onClick={() => setIsEditMode(false)}>
                  Cancel
                </CancelButton>
                <SaveButton onClick={updateBook}>Save</SaveButton>
              </ButtonContainer>
            ) : (
              <ButtonContainer>
                <EditButton onClick={() => setIsEditMode(true)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => setShowModal(true)}>
                  Delete
                </DeleteButton>
              </ButtonContainer>
            )}
          </>
        )}
      </Main>

      {showModal && !isLoading && book && (
        <Modal onDismiss={() => setShowModal(false)}>
          <DeleteModalTitle>Really delete "{book.title}?"</DeleteModalTitle>
          <ModalButtonContainer>
            <ModalDeleteButton onClick={deleteBook}>Confirm</ModalDeleteButton>
          </ModalButtonContainer>
        </Modal>
      )}
    </AppWrapper>
  );
};

const DeleteModalTitle = styled.h2`
  text-align: center;
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 40%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const UnstyledList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    padding: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  width: 40%;
`;

const BaseButton = styled.button`
  padding: 0.5rem;
  width: 110px;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const EditButton = styled(BaseButton)`
  background-color: navy;
  border-color: navy;
`;

const DeleteButton = styled(BaseButton)`
  background-color: red;
  border-color: red;
  float: right;
`;

const ModalDeleteButton = styled(DeleteButton)`
  float: none;
`;

const CancelButton = styled(BaseButton)`
  background-color: grey;
  border-color: grey;
`;

const SaveButton = styled(BaseButton)`
  background-color: green;
  border-color: green;
  float: right;
`;

const ModalButtonContainer = styled.div`
  text-align: center;
`;

export default Book;
