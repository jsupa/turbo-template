import { consola } from 'consola'

const getPrefix = () => (logger.filename ? `[${logger.filename}]` : '')

export const logger = {
  filename: '',

  info: (message: string, ...args: any[]) => {
    consola.info(`${getPrefix()} ${message}`.trim(), ...args)
  },

  warn: (message: string, ...args: any[]) => {
    consola.warn(`${getPrefix()} ${message}`.trim(), ...args)
  },

  error: (message: string, ...args: any[]) => {
    consola.error(`${getPrefix()} ${message}`.trim(), ...args)
  },

  success: (message: string, ...args: any[]) => {
    consola.success(`${getPrefix()} ${message}`.trim(), ...args)
  },

  log: (message: string, ...args: any[]) => {
    consola.log(`${getPrefix()} ${message}`.trim(), ...args)
  },
}
