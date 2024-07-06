import styled from 'styled-components'

export const StyledComponents = () => {
  return (
    <Container>
      <Text>- Styled components-</Text>
      <Button>button</Button>
    </Container>
  )
}

const Container = styled.div`
  border: solid 2px #392eff;
  border-radius: 20px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Text = styled.p`
  margin: 0;
  color: #3d84a8;
`

const Button = styled.button`
  background-color: gray;
  border: none;
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: aquamarine;
    color: #fff;
    cursor: pointer;
  }
`