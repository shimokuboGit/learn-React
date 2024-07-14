import styled from "styled-components"
import { Card } from "../../atoms/card/Card";
import { UserIconWithName } from "../../molecules/user/UserIconWithName";
import { memo } from "react";

export const UserCard = memo((props) => {
  const { user } = props;
  console.log("userCard")
  return (
    <Card>
      <UserIconWithName image={user.image} name={user.name} />
      <SDL>
        <dt>メール</dt>
        <dd>{user.mail}</dd>
        <dt>TEL</dt>
        <dd>{user.tel}</dd>
        <dt>会社名</dt>
        <dd>{user.company.name}</dd>
        <dt>WEB</dt>
        <dd>{user.web}</dd>
      </SDL>
    </Card>
  )
})

const SDL = styled.dl`
  text-align: left;
  margin-bottom: 0px;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`