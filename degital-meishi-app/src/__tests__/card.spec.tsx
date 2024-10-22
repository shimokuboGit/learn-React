import { render, waitFor, screen } from '@testing-library/react';
import { Card } from '../components/pages/card';
import { supabaseClient } from '../supabase';
import { AcceleratedAnimation } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';

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

describe('名刺表示ページのテスト', () => { 
  it('名前が表示されていること', async() => {
    render(
      <BrowserRouter>
        <Card />  
      </BrowserRouter>
    )
    await waitFor(() => expect(screen.getByTestId("user-name")).toHaveTextContent('テスト太郎'))
  })
})