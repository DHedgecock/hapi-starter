import Hapi from 'hapi'

export default async function registerLogger(server: Hapi.Server): Promise<void> {
  try {
    await server.register({
      plugin: require('good'),
      options: {
        ops: {
          interval: 1000,
        },
        reporters: {
          consoleReporter: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [
                {
                  error: '*',
                  log: '*',
                  response: '*',
                  request: '*',
                },
              ],
            },
            {
              module: 'good-console',
            },
            'stdout',
          ],
        },
      },
    })
    server.log('info', 'Logging plugin successfully registered')
  } catch (err) {
    server.log('error', `Error registering logger plugin: ${err}`)
    throw err
  }
}
