import { userOneJobs } from 'lib'
import {rest} from 'msw'

export const handlers = [
  rest.get('jobs', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || 1
    const auth = req.headers.get('Authorization')
    if (!auth || auth.split(' ').length < 2) {
      return res(
        ctx.status(401),
        ctx.json({
          error: 'please log in first'
        })
      )
    }
    const body = {
        page,
        perPage: 6,
        total: userOneJobs.length,
        totalPages: Math.ceil(userOneJobs.length / 6) || 1,
        data: userOneJobs.slice(+page -1, 6),
      }
    return res(
      ctx.status(200),
      ctx.json(body)
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