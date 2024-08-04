import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { App } from "../App";
import React from "react";

describe("test", () => {
  test("view title", () => {
    render(<App />)
    screen.debug()
  })
})
