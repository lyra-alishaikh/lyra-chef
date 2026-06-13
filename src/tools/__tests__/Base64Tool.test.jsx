import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Base64Tool from '../Base64Tool'

describe('Base64Tool', () => {
  it('encodes text to base64', () => {
    render(<Base64Tool />)
    
    const input = screen.getByPlaceholderText('Text or Base64')
    const encodeBtn = screen.getByText('Encode')

    fireEvent.change(input, { target: { value: 'hello' } })
    fireEvent.click(encodeBtn)

    expect(screen.getByText('aGVsbG8=')).toBeInTheDocument()
  })

  it('decodes base64 to text', () => {
    render(<Base64Tool />)
    
    const input = screen.getByPlaceholderText('Text or Base64')
    const decodeBtn = screen.getByText('Decode')

    fireEvent.change(input, { target: { value: 'aGVsbG8=' } })
    fireEvent.click(decodeBtn)

    expect(screen.getByText('hello')).toBeInTheDocument()
  })
})