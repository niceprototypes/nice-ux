import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button'

// Mock the peer dependencies
jest.mock('nice-react-typography', () => ({ children, ...props }: any) => (
  <span {...props}>{children}</span>
))

jest.mock('nice-react-flex', () => ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
))

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies disabled state correctly', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    screen.getByRole('button').click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size={1}>Small</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button size={4}>Large</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders with different statuses', () => {
    const { rerender } = render(<Button status="primary">Primary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button status="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})