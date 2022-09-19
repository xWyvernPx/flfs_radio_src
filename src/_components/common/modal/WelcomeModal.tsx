import React from "react";
import styled from "styled-components";

type Props = {
  onClose: Function;
};

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 11000;
`;
const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 15rem;
  background-color: white;
`;
const OkButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);

  background-color: rgba(103, 217, 255, 0.237);
`;
const WelcomeModal = ({ onClose }: Props) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <OkButton onClick={onClose}> Okayyy</OkButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default WelcomeModal;
