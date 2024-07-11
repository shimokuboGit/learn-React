import { Link, Outlet } from "react-router-dom"

export const Page2 = () => {
  return (
    <div>
      <h1>Page2</h1>
      <Link to='/page2/99'>url parameter</Link>
      <br />
      <Link to='/page2/99?name=hoge'>query parameter</Link>
      <Outlet />
    </div>
  )
}