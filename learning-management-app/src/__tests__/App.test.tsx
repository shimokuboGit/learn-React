import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { App } from "../App";

describe("test", () => {
  render(<App />)

  test("view title", async () => {
    expect(await screen.findByText("LEARNING RECORD3")).toBeInTheDocument();
  })

  test("記録を登録できること", async () => {
    screen.debug()
    console.log(screen.debug());
    
  })
})
