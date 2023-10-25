import * as jwt from 'jsonwebtoken'

export const verify = (payload: string): string => JSON.stringify(jwt.verify(payload, process.env.SECRET_KEY))
