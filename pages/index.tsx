import Head from 'next/head';
import styles from '../styles/Home.module.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Book } from '../data/books';

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
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

const Description = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`;

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LibraryList = styled.div`
  width: 30vw;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const LibraryListItem = styled.a`
  display: block;
  padding: 1rem;
  text-decoration: none;
  border-bottom: 1px solid black;

  &:visited {
    color: inherit;
  }

  &:hover {
    background: #ddd;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AddButton = styled.button`
  padding: 1rem;
  color: white;
  background: green;
  border: 1px solid darkgreen;
  border-radius: 4px;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalContent = styled.div`
  width: 40%;
  background: white;
  z-index: 11;
  min-height: 300px;
  border-radius: 4px;
  padding: 1rem;
`;

export default function Home() {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/books`)
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((books) => setBookList(books))
      .catch(console.error);
  }, []);

  return (
    <AppWrapper>
      <Head>
        <title>Mock Library Manager</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Main>
        <Title>Mock Library Manager</Title>
        <Description>
          Start managing your library by selecting a book from the list below.
        </Description>
        <LibraryList>
          {bookList.map((book) => (
            <LibraryListItem href={`/books/${book.id}`} key={book.id}>
              {book.title}
            </LibraryListItem>
          ))}
        </LibraryList>
        <AddButton onClick={() => setShowModal(true)}>Add Book</AddButton>
      </Main>

      <Footer>Code Example built by Caleb Aston for DigiCert</Footer>

      {showModal && (
        <ModalContainer>
          <ModalOverlay onClick={() => setShowModal(false)} />
          <ModalContent>This is the Modal</ModalContent>
        </ModalContainer>
      )}
    </AppWrapper>
  );
}
