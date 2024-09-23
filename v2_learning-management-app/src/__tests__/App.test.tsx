import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { LearnRecord } from '../domain/LearnRecord';

describe("test", () => {
  render(<App />)

  test("ローディングが見れること", async() => {
    expect(await screen.findByText("Loading..."))
  })
  
  test("タイトルが見れること", async () => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    expect(await screen.findByText("LEARNING RECORD3")).toBeInTheDocument();
  })

  test("TODOリストを見ることができる", async() => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    const records = screen.getAllByRole("listitem")
    console.log(records)
    expect(records.length).toBeGreaterThan(1)
  })

  test("登録ボタンを見ることができる", async() => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    expect(screen.getByText("登録")).toBeInTheDocument()
  })

  test("記録を登録できること", async () => {
    render(<App />)
    await waitFor(() => screen.getByText("新規登録"))

    expect(screen.getByText("新規登録")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: "新規登録"}))

    const inputTitleElement = screen.getByLabelText("学習内容")
    expect(inputTitleElement).toBeInTheDocument()
    await userEvent.type(inputTitleElement, "jest input")
  
    const inputTimeElement = screen.getByLabelText("学習時間")
    expect(inputTimeElement).toBeInTheDocument()
    await userEvent.type(inputTimeElement, "1")

    await userEvent.click(screen.getByTestId("modal-register-button"))

    const records = screen.getAllByText("jest input / 1時間")
    expect(records.length).toBeGreaterThan(1)
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
