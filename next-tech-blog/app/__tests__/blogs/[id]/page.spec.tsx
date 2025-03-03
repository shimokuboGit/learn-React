import Page from "@/app/blogs/[id]/page"
import "@testing-library/jest-dom"
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn(),
  usePathname: jest.fn().mockReturnValue('/expample'),
  useParams: () => jest.fn().mockReturnValue({ id: 'test-id' })
}))

describe('個別ブログページ', () => {

  beforeEach(
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          title: 'test-title',
          thumbnail: 'https://example.com/image.jpg',
          date: '20250101',
          content: 'test',
          url: 'https://example.com'
        }
      })
    }
  ))

  it('初期レンダリング時にローディングを表示', async () => {
    const fetchPromise = new Promise(() => {});
    (global.fetch as jest.Mock) = jest.fn(() => fetchPromise)

    const { container } = render(<Page />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  })

  it('タイトルが見える', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          title: 'test-title',
          thumbnail: 'https://example.com/image.jpg',
          date: '2025-01-01',
          content: 'test-content',
          url: 'https://example.com'
        }
      })
    })

    render(<Page />)
    const title = await screen.findByText('test-title')
    expect(title).toBeInTheDocument();
  })

  it('サムネイルが見える', async () => {
    render(<Page />)
    const thumbnail = await screen.findByAltText("test-title");
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', '/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg&w=1200&q=75')
  })

  it('日付が見える', async () => {
    render(<Page />)
    const date = await screen.findByText(/Published on:\s+1\/1\/2025/);
    expect(date).toBeInTheDocument();
  })

  it('本文が見える', async () => {
    render(<Page />)
    const content = await screen.findByText('test-content');
    expect(content).toBeInTheDocument();
  })

  it('urlが見える', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          title: 'test-title',
          thumbnail: 'https://example.com/image.jpg',
          date: '2025-01-01',
          content: 'test-content',
          url: 'https://example.com'
        }
      })
    })

    render(<Page />)
    const url = await screen.findByRole('link', { name: 'サイトへ移動' })
    expect(url).toBeInTheDocument()
    expect(url).toHaveAttribute('href', 'https://example.com')
  })
})
