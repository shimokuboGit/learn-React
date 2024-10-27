import { render, findByText, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { Top } from "../components/pages/Top"

jest.mock("../supabase", () => {
  return {
    supabaseClient: {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            data: [
              {
                created_at: "2024-10-07T15:25:32.219614+00:00",
                id: 1,
                skill_id: 1,
                skills: {
                  created_at: "2024-10-07T15:27:22.475307+00:00",
                  id: 1,
                  name: "React",
                },
                users: {
                  created_at: "2024-10-07T15:20:43.22443+00:00",
                  description: "<h1>テスト太郎の自己紹介</h1>",
                  github_id: "github_id",
                  id: "testId",
                  name: "テスト太郎",
                  qiita_id: "qiita_id",
                  x_id: "x_id",
                },
              },
            ]
          }
        )
        }),
      }),
    },
  };
});

const mockNavigator = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigator,
}))

describe("トップページのテスト", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Top />
      </BrowserRouter>
    )
  })
  test("名刺を検索", async() => {
    expect(screen.findByText("名刺を検索"))
  })

  test("IDを入力してボタンを押すと/cards/:idに遷移する", async() => {
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "testId" }})
    const searchButton = screen.getByRole("button", { name: "検索" })
    fireEvent.click(searchButton)
    waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith("/card/testId")
    })
  })

  test("ユーザーがヒットしない間はエラーメッセージが見えること", async() => {
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "notExist" }})

    expect(screen.findByText("ユーザーが見つかりません"))
  })

  test("ユーザーがヒットしていない状態では検索ボタンが押せないこと", async() => {
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "notExist" }})

    const searchButton = screen.getByRole("button", { name: "検索" })
    fireEvent.click(searchButton)
    waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledTimes(0)
    })
  })
})