import App from "../App";
import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルがHello Jestであること", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Hello Jest");
  })
})