import { Route, Routes, Outlet } from "react-router-dom"
import { memo, VFC } from "react"

import { Login } from "../components/pages/Login"
import { Home } from "../components/pages/Home"
import { HomeRoutes } from "./HomeRoutes"
import { Page404 } from "../components/pages/Page404"
import { Header } from "../components/organisms/layout/Header"
import { HeaderLayout } from "../components/templates/HeaderLayout"

export const Router: VFC = memo(() => {
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {HomeRoutes.map((route) => (
        <Route 
          key={route.path}
          path={`/home/${route.path}`}
          element=<HeaderLayout>{route.element}</HeaderLayout>
        />
      ))}
      <Route path='*' element={<Page404/>} />
    </Routes>
  )
})