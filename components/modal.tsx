import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  onDismiss: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  onDismiss,
  children,
}) => {
  return (
    <ModalContainer>
      <ModalOverlay onClick={onDismiss} />
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

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

export default Modal;
