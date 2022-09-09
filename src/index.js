/**
 * cf-gsc - Cloudflare worker for Google Search Console
 */

import { Router } from 'itty-router'
import homepage from './handlers/homepage';
import auth from './handlers/auth';
import builder from './handlers/builder';
import query from './handlers/query'
import sites from './handlers/sites'

const router = Router()

router.get('/', homepage)
router.get('/auth/google', auth)
router.get('/builder', builder)
router.get('/data/sites', sites)
router.get('/data/query', query)

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)