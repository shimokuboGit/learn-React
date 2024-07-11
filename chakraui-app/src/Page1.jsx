import { Link, Outlet, useNavigate } from "react-router-dom"


export const Page1 = () => {
  const arr = [...Array(100).keys()]

  const navigate = useNavigate()
  const onClickDetailA = () => { navigate('/page1/detailA')}

  return (
    <div>
      <h1>Page1</h1>
      <Link to='/page1/detailA' state = { arr }>Detail a</Link>
      <br />
      <Link to='/page1/detailB'>Detail b</Link>
      <br />
      <button onClick={onClickDetailA}>button</button>
      <Outlet />
    </div>
  )
}