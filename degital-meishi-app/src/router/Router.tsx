import { FC, memo } from "react";
import { Route, Routes, Outlet } from "react-router-dom"
import { Card } from "../components/pages/card";

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="card/*" element={<Card />} />
    </Routes>
  )
})