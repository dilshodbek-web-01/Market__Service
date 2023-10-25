declare interface AppConfigOptions {
    mode: string
    name: string
    host: string
    port: number
}

export const appConfig: AppConfigOptions = {
    mode: process.env.APP_MODE ?? 'development',
    name: process.env.APP_NAME ?? 'gateway',
    host: process.env.APP_HOST ?? '127.0.0.1',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 7001
}
