import {log} from 'logger'
import {createServer} from './server'

const port = process.env.PORT || 3001

createServer().then((s) =>
  s.listen(port, () => {
    log(`api running on ${port}`)
  })
)
