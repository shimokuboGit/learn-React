import BackButton from "@/app/components/atoms/BackButton"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('戻るボタンのテスト', () => {
  
  it('戻ると表示されている', async () => {
    render(<BackButton />)
    const target = await screen.findByText('戻る')
    expect(target).toBeInTheDocument();
  })

  it('前画面に遷移できる', async () => {
    const backMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: backMock,
    });

    render(<BackButton />)
    const target = await screen.findByRole('button', { name: /戻る/i })
    expect(target).toBeInTheDocument();
    
    fireEvent.click(target)
    expect(backMock).toHaveBeenCalledTimes(1)
  })
})