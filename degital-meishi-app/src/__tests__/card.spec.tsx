import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/pages/card';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { act } from 'react';

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
                  id: "sample_id",
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

const mockNavigator = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigator,
}))

describe('名刺表示ページのテスト', () => {
  
  beforeEach(async () => {
    act(() => {
      render(
        <BrowserRouter>
          <Card />
        </BrowserRouter>
      )
    })
  })
  it('名前が表示されていること', async() => {
    await act(async () => {
      await waitFor(() => expect(screen.getByTestId("user-name")).toHaveTextContent('テスト太郎'))
    })
  })

  it('自己紹介が表示されていること', async() => {
    await act(async () => {
      await waitFor(() => expect(screen.findByText('<h1>テスト太郎の自己紹介</h1>')))
    })
  })

  it('技術（React）が表示されていること', async () => {
    await act(async () => {
      await waitFor(() => {
        expect(screen.findByText("React"))
      });
    })
  })

  it('GitHubのリンクが表示されていること', async () => {
    await act(async () => {
      const githubLink = await screen.findByText("GitHub");
      expect(screen.findByText("GitHub"));
      expect(githubLink);
      expect(githubLink).toHaveAttribute('href', 'https://github.com/github_id')
    })
  })

  it('Qiitaのリンクが表示されていること', async () => {
    await act(async () => {
      const qiitaLink = await screen.findByText("Qiita");
      expect(qiitaLink).toBeInTheDocument();
      expect(qiitaLink).toHaveAttribute('href', 'https://qiita.com/qiita_id')
    })
  })

  it('Xのリンクが表示されていること', async () => {
    await act(async () => {
      const xLink = await screen.findByText("X(Twitter)");
      expect(xLink).toBeInTheDocument();
      expect(xLink).toHaveAttribute('href', 'https://twitter.com/x_id')
    })
  })

  it('戻るボタンをクリックすると/に遷移できること', async () => {
    await act(async () => {
      const button = await screen.findByText('戻る')
      fireEvent.click(button)
      expect(mockNavigator).toHaveBeenLastCalledWith('/')
    })
  })
})