import { handleRequest } from './handler'
import { Application, Router } from '@cfworker/web'
import dnspod from './dnspod'

const router = new Router()

router.all('/dnspod', dnspod)

new Application()
  .use(router.middleware)
  .listen()

// addEventListener('fetch', (event) => {
//   event.respondWith(handleRequest(event.request))
// })
