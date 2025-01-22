import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Title from "../../../components/atoms/Title";

describe('Title', () => {
  it('タイトルがある', () => {
    render(<Title />)
    const title = screen.getByText('Title')
    expect(title).toBeInTheDocument()
  })
})
