import React from "react";
import { IconX } from "@tabler/icons";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import modalState from "../../../_atom/modal.atom";
const ModalContainer = styled.div`
  position: fixed;
  inset: 5%;
  background-color: white;
  z-index: 100;
  right: 20%;
  left: 20%;
  /* border-radius: 10px; */
  padding: 1rem 2rem;
  min-width: 30rem;
`;
const ModalBackdrop = styled.div`
  inset: -10%;
  position: absolute;
  z-index: 9;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
const Modal = ({ component }) => {
  const [modal, setModalState] = useRecoilState(modalState);
  return (
    <>
      <ModalContainer>
        <CloseButton onClick={() => setModalState({ isOpen: false })}>
          <IconX />
        </CloseButton>
        {component}
      </ModalContainer>
      <ModalBackdrop />
    </>
  );
};

export default Modal;
