import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import accountApi from "../../../_api/account.api";
import authAtom from "../../../_atom/auth.atom";
import { IconBrandFacebook, IconBrandGoogle, IconLogout } from "@tabler/icons";

const AccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Account = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    if (!auth.isLoggedIn) {
      accountApi.getMe().then((data) => {
        console.log(data);
        if (data) setAuth({ isLoggedIn: true, user: data });
      });
      console.log("logged in", auth);
    } else {
      console.log("not logged in", auth);
    }
  }, [auth]);
  const UserWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  `;
  const LogoutButton = styled.button`
    display: grid;
    place-items: center;
  `;
  return (
    <AccountWrapper>
      {auth.isLoggedIn ? (
        <UserWrapper style={{ color: "white", fontWeight: "600" }}>
          Hi, {auth?.user?.name}
          <LogoutButton
            onClick={() =>
              window.open("http://localhost:5000/user/logout", "_self")
            }
          >
            <IconLogout color="white" />
          </LogoutButton>
        </UserWrapper>
      ) : (
        <span>
          <button
            onClick={() => {
              window.open("http://localhost:5000/auth/google", "_self");
            }}
          >
            <IconBrandGoogle color="white" />
          </button>
          <button
            onClick={() => {
              window.open("http://localhost:5000/auth/google", "_self");
            }}
          >
            <IconBrandFacebook color="white" />
          </button>
        </span>
      )}
    </AccountWrapper>
  );
};
