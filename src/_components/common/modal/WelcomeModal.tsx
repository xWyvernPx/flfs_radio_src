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
  width: 35rem;
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
  margin-bottom: 1rem;
  background-color: rgba(103, 217, 255, 0.237);
`;
const ContentWrapper = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  text-align: center;
`;
const WelcomeModal = ({ onClose }: Props) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <ContentWrapper>
          <h1>Welcome Flame Foxes Radio 🦊 Enjoy Yourself 🎧</h1>
          <h3>If radio pause, click play button to continue ❤️</h3>
        </ContentWrapper>
        <OkButton onClick={() => onClose()}> Let's go</OkButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default WelcomeModal;
