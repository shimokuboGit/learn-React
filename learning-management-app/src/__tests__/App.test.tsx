import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("test", () => {
  render(<App />)

  test("view title", async () => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    expect(await screen.findByText("LEARNING RECORD3")).toBeInTheDocument();
  })

  test("記録を登録できること", async () => {
    render(<App />)
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    // await screen.debug(screen.getByPlaceholderText('学習内容'))
    const inputTitle = screen.getByPlaceholderText("学習内容")
    await userEvent.type(inputTitle, "jest")

    const inputTime = screen.getByPlaceholderText("学習時間")
    await userEvent.type(inputTime, "3")

    expect(inputTitle).toHaveValue("jest")
    expect(inputTime).toHaveValue(3)

    const registerButton = screen.getByText("登録")
    await userEvent.click(registerButton)

    const records = screen.getAllByRole("listitem")
    expect(records.length).toBe(4)
  })

  test("記録を削除できること", async () => {
    render(<App />)
    await waitFor(() => screen.getByText("LEARNING RECORD3"))

    const targetRecord = screen.getByText("jest / 3時間")

    const deleteButton = targetRecord.closest("div")?.querySelector("button")
    await userEvent.click(deleteButton!)

    const records = screen.getAllByRole("listitem")
    expect(records.length).toBe(3)
  })

  test("記録を入力せずに登録を押すとエラーが表示される", async () => {
    render(<App />)
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    const registerButton = screen.getByText("登録")
    await userEvent.click(registerButton)

    const errorMessage = screen.getByText("入力されていない項目があります")
    expect(errorMessage).toHaveTextContent("入力されていない項目があります")
  })
})
