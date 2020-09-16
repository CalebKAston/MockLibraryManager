import React, { useState } from 'react';
import styled from 'styled-components';

interface AddBookFormProps {
  onSubmit: ({ title: string, pages: number }) => void;
}

const AddBookForm: React.FunctionComponent<AddBookFormProps> = ({
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState<number>();

  return (
    <FormWrapper>
      <FormTitle>Add a Book</FormTitle>
      <InputContainer>
        <Label htmlFor='bookTitle'>Title</Label>
        <br />
        <Input
          id='bookTitle'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor='bookPages'>Pages</Label>
        <br />
        <Input
          id='bookPages'
          type='number'
          step='1'
          value={pages}
          onChange={(e) => setPages(parseInt(e.target.value))}
        />
      </InputContainer>
      <AddButton onClick={() => onSubmit({ title, pages })}>Create +</AddButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const InputContainer = styled.div`
  padding: 0.5rem;
  width: 50%;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
`;

const AddButton = styled.button`
  padding: 1rem;
  color: white;
  background: green;
  border: 1px solid darkgreen;
  border-radius: 4px;
  margin-top: 1rem;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

export default AddBookForm;
