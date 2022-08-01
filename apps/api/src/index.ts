import { createServer } from './server'
import { log } from 'logger'

const port = process.env.PORT || 3001

createServer().then((s) =>
  s.listen(port, () => {
    log(`api running on ${port}`)
  })
)
