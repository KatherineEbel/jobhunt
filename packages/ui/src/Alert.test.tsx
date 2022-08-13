import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
import {Alert} from 'Alert'
import React from 'react'

describe('Alert', function () {
  test('render', () => {
    const {asFragment} = render(<Alert alerts={[]} onDequeueAlert={jest.fn()}/>)
    expect(asFragment()).toMatchSnapshot()
  })
})