export declare interface SignUpRequest {
    username: string
    password: string
    email: string
    phone: string
}

export declare interface SignUpResponse {
    accessToken: string
    refreshToken: string
}