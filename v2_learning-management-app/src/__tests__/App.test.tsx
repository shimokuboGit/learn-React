import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import { App } from "../App";

jest.mock("../hooks/useSupabaseClient.ts", () => {
  return {
    useSupabaseClient: () => ({
      supabaseClient: {
        from: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: [
              {
                id: "1",
                title: "test1",
                time: 2
              }
            ]
          }),
          insert: jest.fn().mockResolvedValue({
            data: [
              {
                id: "2",
                title: "jest",
                time: 1
              }
            ]
          }),
          delete: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({
              data: {
                id: "1",
                title: "test1",
                time: 2
              }
            })
          })
        })
      }
    })
  }
})

describe("test", () => {
  beforeEach(() => {
    render(<App />)
  })

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
    expect(records.length).toBe(1)
  })

  test("登録ボタンを見ることができる", async() => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))
    expect(screen.getByText("新規登録")).toBeInTheDocument()
  })

  test("記録を登録できること", async () => {
    await waitFor(() => screen.getByTestId("register-button"))

    expect(screen.getByTestId("register-button")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("register-button"))

    const inputTitleElement = screen.getByLabelText("学習内容")
    expect(inputTitleElement).toBeInTheDocument()
    await userEvent.type(inputTitleElement, "jest")
  
    const inputTimeElement = screen.getByLabelText("学習時間")
    expect(inputTimeElement).toBeInTheDocument()
    await userEvent.type(inputTimeElement, "1")

    await userEvent.click(screen.getByTestId("modal-register-button"))

    const records = screen.getAllByText("jest / 1時間")
    expect(records[0]).toBeVisible()
  })

  test("記録を削除できること", async () => {
    await waitFor(() => screen.getByText("LEARNING RECORD3"))

    expect(screen.getByText("test1 / 2時間")).toBeInTheDocument()

    const targetRecord = screen.getByText("test1 / 2時間")

    const deleteButton = screen.getByRole("button", { name: "削除" })
    await userEvent.click(deleteButton!)

    expect(targetRecord).not.toBeInTheDocument()
  })

  test("内容を入力せずに登録を押すとエラーが表示される", async () => {
    await waitFor(() => screen.getByTestId("register-button"))

    expect(screen.getByTestId("register-button")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("register-button"))
  
    const inputTimeElement = screen.getByLabelText("学習時間")
    expect(inputTimeElement).toBeInTheDocument()
    await userEvent.type(inputTimeElement, "1")

    await userEvent.click(screen.getByTestId("modal-register-button"))

    expect(screen.getByText("内容の入力は必須です")).toBeInTheDocument()
  })

  test("時間を入力せずに登録を押すとエラーが表示される", async () => {
    await waitFor(() => screen.getByTestId("register-button"))

    expect(screen.getByTestId("register-button")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("register-button"))
  
    const inputTitleElement = screen.getByLabelText("学習内容")
    expect(inputTitleElement).toBeInTheDocument()
    await userEvent.type(inputTitleElement, "test")

    await userEvent.click(screen.getByTestId("modal-register-button"))

    expect(screen.getByText("時間の入力は必須です")).toBeInTheDocument()
  })

  test("時間が0以下の時に登録を押すとエラーが表示される", async () => {
    await waitFor(() => screen.getByTestId("register-button"))

    expect(screen.getByTestId("register-button")).toBeInTheDocument()
    fireEvent.click(screen.getByTestId("register-button"))
  
    const inputTimeElement = screen.getByLabelText("学習時間")
    expect(inputTimeElement).toBeInTheDocument()
    await userEvent.type(inputTimeElement, "0")

    await userEvent.click(screen.getByTestId("modal-register-button"))

    expect(screen.getByText("時間は0以上である必要があります")).toBeInTheDocument()
  })

  test("編集ボタンを押すと記録編集モーダルを開くことが出来る", async() => {
    await waitFor(() => screen.getByTestId("register-button"))

    const editButton = screen.getByRole("button", { name: "編集" })
    await userEvent.click(editButton)

    expect(screen.getByText("記録編集")).toBeInTheDocument()
  })
})
