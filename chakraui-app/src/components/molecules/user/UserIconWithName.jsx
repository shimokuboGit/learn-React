import styled from "styled-components"
// import { UserContext } from "../../../providers/UserProvider";
import React, { memo, useContext } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../store/UserState";

export const UserIconWithName = memo((props) => {
  const { image, name } = props;
  // const { userInfo } = useContext(UserContext);
  // recoilを使用
  const userInfo = useRecoilValue(userState)
  const isAdmin = userInfo ? userInfo.isAdmin : false

  console.log("userIconWithName");
  return (
    <SContainer>
      <SImage height={160} width={160} src={image} alt="プロフィール" />
      <SName>{name}</SName>
      {isAdmin && <SEdit>編集</SEdit>}
    </SContainer>
  )
})

const SContainer = styled.div`
  text-align: center;
`
const SImage = styled.img`
  border-radius: 50%;
`
const SName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #40504e;
`
const SEdit = styled.span`
  text-decoration: underline;
  color: #aaa;
  cursor: pointer;
`