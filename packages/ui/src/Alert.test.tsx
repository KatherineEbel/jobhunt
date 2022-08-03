import "@testing-library/jest-dom";
import {render, screen} from '@testing-library/react'
import React from 'react'
import {Alert} from './Alert'

describe('Alert', function () {
  test('render', () => {
    render(<Alert message='Test message' type='success'/>)
    const alert = screen.getByText('Test message')
    expect(alert).toBeInTheDocument()
  })
})