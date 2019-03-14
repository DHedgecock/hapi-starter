import Hapi from 'hapi'

import registerLogger from './plugins/logger'
import registerCustom from './plugins/custom'

// --- Handle app level unhandled errors ---

process.on('unhandledRejection', err => {
  console.error(err)
  process.exit(1)
})

// --- Create the server instance ---

const server = new Hapi.Server({
  host: 'localhost',
  port: 8000,
})

server.route([
  {
    method: 'GET',
    path: '/',
    options: {
      description: 'Sends a friendly greeting!',
      notes: 'No route parameters available',
      tags: ['greeting'],
      handler: () => {
        return 'Hello Hapi Starter!'
      },
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: () => {
      // process the request’s payload …

      return 'Created a new Future Studio instance'
    },
  },
  {
    method: 'GET',
    path: '/page/{page}',
    handler: (request: Hapi.Request) => {
      return `Greetings from page ${encodeURIComponent(request.params.page)}`
    },
  },
])

// A server method configuration object accepts a single type or an array of types

async function start() {
  try {
    // --- Register server plugins ---
    await registerLogger(server)
    await registerCustom(server)

    // --- Start the server ヘ( ^o^)ノ＼(^_^ ) ---
    await server.start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  server.log('info', `Server running at: ${server.info.uri}`)
}

// --- 🎉 Start the Party 🎉 ---

start()
