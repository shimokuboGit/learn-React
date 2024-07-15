import styled from "styled-components"
// import { useLocation } from "react-router-dom"
import { SearchInput } from "../molecules/SearchInput"
import { UserCard } from "../organisms/user/UserCard"
// import { useContext } from "react"
// import { UserContext } from "../../providers/UserProvider"
import { SecondaryButton } from "../atoms/button/SecondaryButton"
import { useRecoilState } from "recoil"
import { userState } from "../../store/UserState"

const users = [...Array(10).keys()].map((val) => {
  return {
    id: val,
    name: `user-${val}`,
    image: "https://plus.unsplash.com/premium_photo-1720350577953-496492033e07?q=80&w=2536&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "exsample@hoge.com",
    tel: "000-9999-9999",
    company: {
      name: 'kingdom-cokingdom-cokingdom-cokingdom-cokingdom-cokingdom-co'
    },
    web: "https://hoge.com" 
  }
})

export const Users = () => {
  // const { userInfo, setUserInfo } = useContext(UserContext)
  // recoilでstateを取得する
  const [ userInfo, setUserInfo ] = useRecoilState(userState)

  const switchAdmin = () => setUserInfo({ isAdmin: !userInfo.isAdmin })

  return (
    <SContainer>
      <h2>User page</h2>
      <SearchInput></SearchInput>
      <SecondaryButton onClick={switchAdmin}>切り替え</SecondaryButton>
      <SUserArea>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SUserArea>
    </SContainer>
  )
}

const SContainer = styled.div`
  text-align: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const SUserArea = styled.div`
  padding-top: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`