import Hapi from 'hapi'

interface CustomPluginOptions {
  isRad?: boolean
}

interface CustomPlugin {
  name: string
  version: string
  register(server: Hapi.Server, options: CustomPluginOptions): Promise<void>
}

const customPlugin: CustomPlugin = {
  name: 'Custom',
  version: '1.0.0',
  register: async (server, options) => {
    if (options && options.isRad) server.log('info', 'This custom plugin is rad')
  },
}

export default async function registerCustom(server: Hapi.Server) {
  try {
    await server.register({
      plugin: customPlugin,
      options: {
        isRad: true,
      },
    })
    server.log('info', 'Custom plugin successfully registered')
  } catch (err) {
    server.log('error', `Error registering custom plugin: ${err}`)
    throw err
  }
}
