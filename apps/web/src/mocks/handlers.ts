import { userOneJobs } from 'lib'
import {rest} from 'msw'

export const handlers = [
  rest.get('jobs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        jobs: userOneJobs,
        count: userOneJobs.length,
        pages: 1,
      })
    )
  }),
  rest.get('jobs/stats', (req, res, ctx) => {
    const auth = req.headers.get('Authorization')
    if (auth?.split(' ').length === 2)
      return res(
        ctx.status(200),
        ctx.json({
          'stats': {
            'interview': 18,
            'offer': 15,
            'declined': 22,
            'pending': 20,
            'applications': [{'date': 'Feb 2022', 'count': 2}, {'date': 'Mar 2022', 'count': 2}, {
              'date': 'Apr 2022',
              'count': 2
            }, {'date': 'May 2022', 'count': 1}, {'date': 'Jun 2022', 'count': 3}, {'date': 'Jul 2022', 'count': 4}]
          }
        })
      )

    return res(
      ctx.status(403)
    )
  })
]