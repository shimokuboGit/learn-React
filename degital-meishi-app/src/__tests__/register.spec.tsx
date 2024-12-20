import { render, findByText, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter, useNavigate } from "react-router-dom"
import { Register } from "../components/pages/Register"
import { act } from "react"
import { supabaseClient } from "../supabase"
import userEvent from '@testing-library/user-event';

// jest.mock('../supabase', () => {
//   return {
//     supabaseClient: {
//       from: jest.fn().mockReturnValue({
//         select: jest.fn().mockReturnValue({
//           eq: jest.fn().mockReturnValue({
//             data: [
//               {
//                 created_at: "2024-10-07T15:25:32.219614+00:00",
//                 id: 1,
//                 skill_id: 1,
//                 skills: {
//                   created_at: "2024-10-07T15:27:22.475307+00:00",
//                   id: 1,
//                   name: "React",
//                 },
//                 users: {
//                   created_at: "2024-10-07T15:20:43.22443+00:00",
//                   description: "<h1>テスト太郎の自己紹介</h1>",
//                   github_id: "github_id",
//                   id: "sample_id",
//                   name: "テスト太郎",
//                   qiita_id: "qiita_id",
//                   x_id: "x_id",
//                 },
//               },
//             ]
//           }
//         ),
//         insert: jest.fn().mockReturnValue({
//           data: [
//             {
//               created_at: "2024-10-26T04:40:16.341676+00:00",
//               description: "テストの自己紹介",
//               github_id: "",
//               id: "a",
//               name: "a",
//               qiita_id: "",
//               x_id: "",
//             }
//           ]
//         })
//         }),
//       }),
//     }
//   }
// })

jest.mock('../supabase', () => {
  return {
    supabaseClient: {
      from: jest.fn((table) => {
        if (table === 'users') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                data: [
                  {
                    created_at: "2024-10-26T04:40:16.341676+00:00",
                    description: "テストの自己紹介",
                    github_id: "",
                    id: "a",
                    name: "a",
                    qiita_id: "",
                    x_id: "",
                  }
                ],
                error: null
              })
            }),
          }
        }
        if (table === 'skills') {
          return {
            select: jest.fn((columns) => {
              if (columns === '*') {
                return {
                  data: [
                    { id: 1, name: "React", created_at: "2024-10-07T15:27:22.475307+00:00" },
                    { id: 2, name: "TypeScript", created_at: "2024-10-07T15:28:22.475307+00:00" },
                    { id: 3, name: "GitHub", created_at: "2024-10-07T15:28:22.475307+00:00" },
                  ],
                  error: null
                };
              }
              return {
                eq: jest.fn().mockReturnValue({
                  data: [
                    {
                      created_at: "2024-10-07T15:27:22.475307+00:00",
                      id: 1,
                      name: "React",
                    }
                  ],
                  error: null
                })
              }
            })
          }
        }
        if (table === 'user_skill') {
          return {
            insert: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnValue({
                data: [
                  {
                    created_at: "2024-10-07T15:25:32.219614+00:00",
                    id: 1,
                    skill_id: 1,
                    user_id: "a",
                  },
                ],
                error: null,
              })
            }),
          }
        }
      })
    }
  }
})

const mockNavigator = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigator,
}))

describe('登録ページのテスト', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
  })

  test("タイトルが見えること", async() => {
    expect(await screen.findByText("名刺を登録"))
  })

  test("全項目入力して登録ボタンを押すと/に遷移する", async() => {
    const inputId = screen.getByRole("textbox", { name: "ID" }).closest("input")!
    fireEvent.change(inputId, {target: {value: 'testId'}})
    expect(inputId.value).toBe("testId")
    
    const inputName = screen.getByRole("textbox", { name: "名前" }).closest("input")!
    fireEvent.change(inputName, { target: {value: 'test-name'}})
    expect(inputName.value).toBe('test-name')
    
    const inputDescription = screen.getByRole("textbox", { name: "自己紹介" }).closest("textarea")!;
    fireEvent.change(inputDescription, { target: { value: "テストの自己紹介" } });
    expect(inputDescription.value).toBe("テストの自己紹介");

    const skillSelect = await waitFor(() => screen.getByRole("combobox", { name: "好きな技術" }).closest("select")!);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    });
    fireEvent.change(skillSelect, { target: { value: "React" } });
    expect(skillSelect.value).toBe("React");

    const inputGitHubId = screen.getByRole("textbox", { name: "GitHub ID" }).closest("input")!;
    fireEvent.change(inputGitHubId, { target: { value: "github-test" } });
    expect(inputGitHubId.value).toBe("github-test");
    
    const inputQiitaId = screen.getByRole("textbox", { name: "Qiita ID" }).closest("input")!;
    fireEvent.change(inputQiitaId, { target: { value: "qiita-test" } });
    expect(inputQiitaId.value).toBe("qiita-test");
    
    const inputXId = screen.getByRole("textbox", { name: "Twitter (X) ID" }).closest("input")!;
    fireEvent.change(inputXId, { target: { value: "x-test" } });
    expect(inputXId.value).toBe("x-test");
    
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith('/')
    })
  })

  test("IDがないときにエラーメッセージが見えること", async () => {
    const inputName = screen.getByRole("textbox", { name: "名前" }).closest("input")!
    fireEvent.change(inputName, { target: {value: 'test-name'}})
    expect(inputName.value).toBe('test-name')
    
    const inputDescription = screen.getByRole("textbox", { name: "自己紹介" }).closest("textarea")!;
    fireEvent.change(inputDescription, { target: { value: "テストの自己紹介" } });
    expect(inputDescription.value).toBe("テストの自己紹介");

    const skillSelect = await waitFor(() => screen.getByRole("combobox", { name: "好きな技術" }).closest("select")!);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    });
    fireEvent.change(skillSelect, { target: { value: "React" } });
    expect(skillSelect.value).toBe("React");

    const inputGitHubId = screen.getByRole("textbox", { name: "GitHub ID" }).closest("input")!;
    fireEvent.change(inputGitHubId, { target: { value: "github-test" } });
    expect(inputGitHubId.value).toBe("github-test");
    
    const inputQiitaId = screen.getByRole("textbox", { name: "Qiita ID" }).closest("input")!;
    fireEvent.change(inputQiitaId, { target: { value: "qiita-test" } });
    expect(inputQiitaId.value).toBe("qiita-test");
    
    const inputXId = screen.getByRole("textbox", { name: "Twitter (X) ID" }).closest("input")!;
    fireEvent.change(inputXId, { target: { value: "x-test" } });
    expect(inputXId.value).toBe("x-test");
    
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})
    expect(await screen.findByText("IDは必須です"))
  })

  test("名前がないときにエラーメッセージが見えること", async () => {
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})
    expect(await screen.findByText("IDは必須です"))
  })

  test("名前がないときにエラーメッセージが見えること", async () => {
    const inputId = screen.getByRole("textbox", { name: "ID" }).closest("input")!
    fireEvent.change(inputId, {target: {value: 'testId'}})
    expect(inputId.value).toBe("testId")
    
    const inputDescription = screen.getByRole("textbox", { name: "自己紹介" }).closest("textarea")!;
    fireEvent.change(inputDescription, { target: { value: "テストの自己紹介" } });
    expect(inputDescription.value).toBe("テストの自己紹介");

    const skillSelect = await waitFor(() => screen.getByRole("combobox", { name: "好きな技術" }).closest("select")!);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    });
    fireEvent.change(skillSelect, { target: { value: "React" } });
    expect(skillSelect.value).toBe("React");

    const inputGitHubId = screen.getByRole("textbox", { name: "GitHub ID" }).closest("input")!;
    fireEvent.change(inputGitHubId, { target: { value: "github-test" } });
    expect(inputGitHubId.value).toBe("github-test");
    
    const inputQiitaId = screen.getByRole("textbox", { name: "Qiita ID" }).closest("input")!;
    fireEvent.change(inputQiitaId, { target: { value: "qiita-test" } });
    expect(inputQiitaId.value).toBe("qiita-test");
    
    const inputXId = screen.getByRole("textbox", { name: "Twitter (X) ID" }).closest("input")!;
    fireEvent.change(inputXId, { target: { value: "x-test" } });
    expect(inputXId.value).toBe("x-test");
    
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})

    expect(screen.findByText("名前は必須です"))
  })

  test("自己紹介がない時にエラーメッセージが見えること", async() => {
    const inputId = screen.getByRole("textbox", { name: "ID" }).closest("input")!
    fireEvent.change(inputId, {target: {value: 'testId'}})
    expect(inputId.value).toBe("testId")
    
    const inputName = screen.getByRole("textbox", { name: "名前" }).closest("input")!
    fireEvent.change(inputName, { target: {value: 'test-name'}})
    expect(inputName.value).toBe('test-name')

    const skillSelect = await waitFor(() => screen.getByRole("combobox", { name: "好きな技術" }).closest("select")!);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    });
    fireEvent.change(skillSelect, { target: { value: "React" } });
    expect(skillSelect.value).toBe("React");

    const inputGitHubId = screen.getByRole("textbox", { name: "GitHub ID" }).closest("input")!;
    fireEvent.change(inputGitHubId, { target: { value: "github-test" } });
    expect(inputGitHubId.value).toBe("github-test");
    
    const inputQiitaId = screen.getByRole("textbox", { name: "Qiita ID" }).closest("input")!;
    fireEvent.change(inputQiitaId, { target: { value: "qiita-test" } });
    expect(inputQiitaId.value).toBe("qiita-test");
    
    const inputXId = screen.getByRole("textbox", { name: "Twitter (X) ID" }).closest("input")!;
    fireEvent.change(inputXId, { target: { value: "x-test" } });
    expect(inputXId.value).toBe("x-test");
    
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})

    expect(screen.findByText("自己紹介は必須です"))
  })

  test("GitHubId, QiitaId, TwitterIdは入力しなくても登録できる", async() => {
    const inputId = screen.getByRole("textbox", { name: "ID" }).closest("input")!
    fireEvent.change(inputId, {target: {value: 'testId'}})
    expect(inputId.value).toBe("testId")
    
    const inputName = screen.getByRole("textbox", { name: "名前" }).closest("input")!
    fireEvent.change(inputName, { target: {value: 'test-name'}})
    expect(inputName.value).toBe('test-name')
    
    const inputDescription = screen.getByRole("textbox", { name: "自己紹介" }).closest("textarea")!;
    fireEvent.change(inputDescription, { target: { value: "テストの自己紹介" } });
    expect(inputDescription.value).toBe("テストの自己紹介");

    const skillSelect = await waitFor(() => screen.getByRole("combobox", { name: "好きな技術" }).closest("select")!);
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "React" })).toBeInTheDocument();
    });
    fireEvent.change(skillSelect, { target: { value: "React" } });
    expect(skillSelect.value).toBe("React");
    
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith('/')
    })
  })

  test("必須項目の入力がないと登録できないこと", async() => {
    const button = await screen.findByText('登録')
    act(() => {fireEvent.click(button)})
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith('/')
    })
  })
})
