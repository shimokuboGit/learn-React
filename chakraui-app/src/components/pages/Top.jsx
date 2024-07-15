import styled from "styled-components"
import { SecondaryButton } from "../atoms/button/SecondaryButton";
import { useNavigate } from  "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useSetRecoilState } from "recoil";
import { userState } from "../../store/UserState";
import axios from "axios";

export const Top = () => {
  const navigate = useNavigate()
  // const { setUserInfo } = useContext(UserContext);
  // recoilを使用
  const setUserInfo = useSetRecoilState(userState);
  const onClickAdmin = () => {
    setUserInfo({ isAdmin: true })
    navigate("/users")
  }
  const onClickGeneral = () => {
    setUserInfo({ isAdmin: false })
    navigate("/users")
  }

  const onClickUsers = () => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) =>
      {console.log(res.data[0].name)
    })
    .catch((e) => console.log(e));
  }
  const onClickUser1 = () => {
    axios.get("https://jsonplaceholder.typicode.com/users/3").then((res) =>
      {console.log(res.data)
    })
    .catch((e) => console.log(e));
  }
  return (
    <SContainer>
      <h2>TOP page</h2>
      <SecondaryButton onClick={onClickAdmin}>管理ユーザー</SecondaryButton>
      <br />
      <br />
      <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton>
      <br />
      <br />
      <SecondaryButton onClick={onClickUsers}>Users</SecondaryButton>
      <br />
      <br />
      <SecondaryButton onClick={onClickUser1}>id=1のユーザー</SecondaryButton>
    </SContainer>
  )
}

const SContainer = styled.div`
  text-align: center;
`;