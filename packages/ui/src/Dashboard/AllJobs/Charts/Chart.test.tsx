import {render} from '@testing-library/react'
import {PropsWithChildren} from 'react'
import * as React from 'react'
import {Chart} from './Chart'

jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts')
  return {
    ...OriginalModule,
    ResponsiveContainer: ({children}: PropsWithChildren) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    )
  }
})

describe('Chart', () => {
  beforeEach(() => {
    // delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  })
    test('it can display stats', () => {
      const { asFragment } = render(<Chart totals={[{date: 'Feb 2022', count: 2}, {date: 'Mar 2022', count: 2}, {
        date: 'Apr 2022',
        count: 2
      }, {date: 'May 2022', count: 1}, {date: 'Jun 2022', count: 3}, {date: 'Jul 2022', count: 4}]}/>)

      expect(asFragment()).toMatchSnapshot()
    })
  }
)