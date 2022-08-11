import { rest } from 'msw'

export const handlers = [
  rest.get('jobs/stats', (req, res, ctx) => {
    const auth = req.headers.get('Authorization')
    if (auth?.split(' ').length === 2)
      return res(
        ctx.status(200),
        ctx.json({
          jobs: [],
          count: 0,
          pages: 1
        })
      )

    return res(
      ctx.status(403)
    )
  })
]