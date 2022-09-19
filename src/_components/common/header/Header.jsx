import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import modalState from "../../../_atom/modal.atom";
import SuggestionForm from "../form/SuggestionForm";
import Modal from "../modal/Modal";
import { Account } from "./Account";

const HeaderContainer = styled.div`
  height: 4rem;
  width: 100vw;
  padding: 0rem 1rem;
  padding-top: 0.75rem;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  position: relative;
`;

const LogoWrapper = styled.div`
  width: 80px;
  aspect-ratio: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const SuggestButton = styled.button`
  margin: 1rem;
  padding: 0.75rem 1rem;
  height: 3.5rem;
  color: #a5a3a1;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  z-index: 1;
  line-height: 1.5;
  transition: all 0.2s linear;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #d5d2ce;
  &:hover {
    border: 2px solid #fff;
    color: #fff;
  }
  &::after {
    content: "";

    right: 10%;
    top: 0rem;
    transform: translateY(-50%);
  }
  &::before {
    content: "";
    left: 12%;
    bottom: 0rem;
    transform: translateY(50%);
  }
  &::before,
  &::after {
    position: absolute;
    width: 0.75rem;
    height: 0.45rem;
    background-color: #d5d2ce;
    transition: all 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
  &:hover::after {
    content: "";
    right: 75%;
    background-color: #fff;
    /* transform: translate(-200%, -50%); */
  }
  &:hover::before {
    content: "";
    background-color: #fff;
    left: 80%;
    /* transform: translate(-200%, -50%); */
  }
`;
const SuggestWrapper = styled.div`
  display: grid;
  place-items: center;
  gap: 1rem;
`;

const Header = ({ socket }) => {
  const [suggestActive, setSuggestActive] = useState(false);
  const [modal, setModalState] = useRecoilState(modalState);
  return (
    <HeaderContainer>
      <LogoWrapper>
        <img src="./logo.png" alt="logo" />
      </LogoWrapper>
      <SuggestWrapper>
        <SuggestButton
          onClick={() => {
            setModalState({ isOpen: true });
          }}
        >
          Suggest
        </SuggestButton>
      </SuggestWrapper>
      <Account />
      {modal.isOpen && <Modal component={<SuggestionForm socket={socket} />} />}
    </HeaderContainer>
  );
};

const SearchField = styled.div`
  position: relative;
  /* width: 100%; */
  height: 5rem;
  input {
    background: transparent;
    width: 100%;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    border: 2px solid #a5a3a1;
    color: #fff;
    font-size: 1.15rem;
    transition: all 0.2s ease-in-out;
    &:focus {
      border: 2px solid #fff;
    }
    &::placeholder {
      color: #dfdeded8;
    }
  }
`;

export default Header;
