import { FC, memo } from "react";
import { Route, Routes, BrowserRouter, Router } from "react-router-dom"
import { Card } from "../components/pages/card";
import { Page404 } from "../components/pages/Page404";
import { Switch } from "@chakra-ui/react";
import { Register } from "../components/pages/Register";
import { Top } from "../components/pages/Top";

export const AppRouter: FC = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="card/:id" element={<Card />} />
        <Route path="card/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
})